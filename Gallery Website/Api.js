
const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 5000;

app.listen(
    port,
    function(){ console.log(`Starting port at: ${port}`)}
);




app.get('/get',function(req,res){
    fs.readFile('data.json','utf-8', (error,data)=>{
       res.send(JSON.parse(data.toString()));
       console.log(JSON.parse(data.toString()));
       
    })
});


app.post('/post', function(req, res) {
    console.log('Receiving data...');
    console.log(JSON.stringify(req.body));
  
    fs.readFile('SelectedData.json', 'utf-8', (error, data) => {
        
      console.log('Data read from file:', data); 
  
      try {
        let arrayOfData = JSON.parse(data || '[]'); 

        const isDuplicate = arrayOfData.some(item => item.Images === req.body.Images);

        if (!isDuplicate) {
          arrayOfData.push(req.body);
  
          fs.writeFile('SelectedData.json', JSON.stringify(arrayOfData, null, 2), (error) => {
            if (error) {
              console.error('Error writing file:', error);
              return res.status(500).send('Error writing file');
            }
  
            console.log('Data appended and file updated successfully');
            res.status(200).send('Data appended and file updated successfully');
          });
        } else {
          console.log('Duplicate value detected, not appending to file');
          res.status(400).send('Duplicate value detected, not appending to file');
        }
      } catch (parseError) {
        console.error('Error parsing JSON data:', parseError);
        res.status(400).send('Error parsing JSON data');
      }
    });
});


app.get('/get-Selected-Data',function(req,res){
    fs.readFile('SelectedData.json','utf-8', (error,data)=>{
       res.send(JSON.parse(data.toString()));
       console.log(JSON.parse(data.toString()));
    })
});
