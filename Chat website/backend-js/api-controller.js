const app = require('express')();
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
require("dotenv").config();


const port = 5000;




app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


// Load front-end stuff
app.use('/pages', express.static(path.join(__dirname.slice(0, 25), 'front-end', 'pages')));
app.use('/js-scripts', express.static(path.join(__dirname.slice(0, 25), 'front-end', 'js-scripts')));
app.use('/css', express.static(path.join(__dirname.slice(0, 25), 'front-end', 'css')));
app.use('/backend-js', express.static(path.join(__dirname.slice(0, 25), 'backend-js')));


app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: false,
	})
);

const isAuthenticated = async function (req, res, next) {
	if (req.session.username) {
		next();
	} else {
		res.redirect("/");
	}
};


mongoose.connect(process.env.MONGO_CONNECTION)

  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(
        port,
        () => {
            console.log(`Starting port at: ${port}`)
        }
    );

  })

  .catch((errorConnecting) => {
    console.log('Error connecting to MongoDB:', errorConnecting);
  });




app.get('/', async function(req,res){
        res.sendFile(__dirname.slice(0,25) + "/front-end/pages/index.html");
  });



app.get('/create-account', async function(req,res){
    res.sendFile(__dirname.slice(0,25) + "/front-end/pages/register.html");
  });





app.get("/messging-page",isAuthenticated,async function(req,res) {
    res.sendFile(__dirname.slice(0,25) + "/front-end/pages/messging page.html");
});




app.get('/logOut', async function(req, res) {
    req.session.destroy(function () {
		res.clearCookie("sessionId");
		res.redirect("/");
	});
});




app.post('/api/users-accounts', async function(req,res){

    const collection = mongoose.connection.db.collection('twitter_data');
    const arrayOfData = await collection.find().toArray();

    const isExists = arrayOfData.some(item => item.username === req.body.username && item.password === req.body.password);

    if(isExists){
        req.session.username = req.body.username;
        res.cookie("sessionId", req.sessionID);
        return res.redirect(`/messging-page?username=${encodeURIComponent(req.session.username)}`);
    }
    else{
        res.status(401).json({ message: "Invalid credentials" });
    }
   

});


app.get('/api/users-tweets', async function(req,res){

    const collection = mongoose.connection.db.collection('twitter_data');
    const arrayOfData = await collection.find().toArray();
    

    let filteredArray = [];

    try{
        
        arrayOfData.forEach(items => {

             let temp = {};

             Object.entries(items).forEach(([key, value]) => {
                 if(key !== "password"){
                     temp[key] = value;
                 }
             });

             filteredArray.push(temp);
         });
     
        res.send(filteredArray);
    }

  
    catch(error){
       console.log(error);

    }

});



app.post('/api/create-new-users', async function(req, res) {


    const collection = mongoose.connection.db.collection('twitter_data');
    const arrayOfData = await collection.find().toArray();

    const { username,password,postedTweets } = req.body;
    let pattern = /^[a-zA-Z0-9]+$/;

    if(!pattern.test(username)){
        return res.status(409).json({ error: "Characters aren't allowed!" });
    }

    try{

    const isDuplicate = arrayOfData.some(item => item.username === req.body.username && item.password === req.body.password);

    const newUser = {
        username,
        password,
        postedTweets
    };

    if (isDuplicate) {
        return res.status(409).json({ error: 'User already exists' });
    }

        if(!isDuplicate){

            await collection.insertOne(newUser);

            res.status(200).send('Created new user successfully');
        
        }
    }

    catch(error){
        res.status(500).json({ error: 'Error creating new user' });

    }


   
});



app.put('/api/save-users-tweets', async function(req, res) {


    const collection = mongoose.connection.db.collection('twitter_data');
    const arrayOfData = await collection.find().toArray();

    
    const { username,postedTweets } = req.body;

    const ifExists = arrayOfData.some(item => item.username === username);

    try{

        if(ifExists){
        
        const result = await collection.updateOne(
            { username: username },
            { $push: { postedTweets: postedTweets }}
        );

            if (result.matchedCount === 0) {

                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'Tweet added successfully' });
            }
    }

    catch(error){
        res.status(500).json({ error: 'Error adding tweet' });
    }

});



app.all('*', async function (req, res) {
    res.status(404).send("<h1>404 Page Not Found</h1>");
  });
