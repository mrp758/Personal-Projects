import React from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import '../css/InputData.css';
import { useEffect, useState } from 'react';


function Info() {
const {id} = useParams();
let navigate = useNavigate();
const[selectedImage,setSelectedImage] = useState([]);
const[JsonData,setJsonData] = useState([]);

useEffect(() =>{

  fetch('http://localhost:5000/get', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
      const jsonPromise = response.json();
      jsonPromise.then((data) => {
        if(data != null){
          setJsonData(data);
    }
      })})
},[])


useEffect(() => {
  if(selectedImage.length > 0){
      fetch('http://localhost:5000/post', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({Images:selectedImage})
    })
  }
}, [selectedImage]);


function handleSelectedImage(imageValue){
    console.log(imageValue);
    if(selectedImage.length === 0){
    setSelectedImage(imageValue);
    }
}


function handleIdData(){
    return(
        <div>
        {
          JsonData.map((value,key) =>{
            if(id == value.id){
              handleSelectedImage(value.Image);
            return(
              <div key={key}>
                 <div className='InfoBackGround'>
                        <img src={value.Image} className="InfoImage"/>
                        <p><strong>Name:</strong> {value.name}</p>
                        <p><strong>Last Name:</strong> {value.lastName}</p>
                        <p><strong>Real Name:</strong> {value.RealName}</p>
                        <p><strong>Role: </strong> {value.Role}</p>
                        <p><strong>Description: </strong> {value.Description}</p>
                  </div>
              </div>
          )}})
          
        }
        </div>
      )
}


function HandleClick(){
    return(
      <div>
        <button className='button' onClick={() => {
            navigate("/SecondPage");
        }}>Return to SecondPage</button>
        <button className='button' onClick={() => {
            navigate("/");
        }}>Return to MainPage</button>
      </div>
    )
}


  return (
    <div>
    <div>{handleIdData()}</div>
    <div>{HandleClick()}</div>
    </div>
  )
}

export default Info;