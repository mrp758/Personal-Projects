
const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

app.listen(
    port,
    function(){ console.log(`Ughhh ${port}`)}
);




app.get('/get',function(req,res){
    console.log("sheesh no cap");
    fs.readFile('usersData.json','utf-8', (error,data)=>{
       console.log((JSON.parse(data.toString())));
        res.send(JSON.parse(data.toString()));
    })
});


app.post('/post',function(req,res){
    console.log('receiving data ...');
    fs.readFile('usersData.json','utf-8', (error,data)=>{
        fs.writeFileSync('usersData.json', `${JSON.stringify(req.body, null, 2)}`);

    });
});



app.delete('/delete/:id', (req, res) => {
    const data = fs.readFileSync('usersData.json','utf-8');
    if(data != null){
        let parseData = JSON.parse(data);
        let turnToArray = Object.values(parseData.userAccount);
        const newData = turnToArray.filter((key,value) => key.id !== req.params.id);
        fs.writeFileSync('usersData.json', `{
            "userAccount":
            ${JSON.stringify(newData, null, 2)}
        }`);
    }
});