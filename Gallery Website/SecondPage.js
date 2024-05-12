import React, { useState,useEffect } from 'react'
import InputField from './InputField';
import {useNavigate} from 'react-router-dom'

function SecondPage() {
const[Input,setInput] = useState("");
const[Show,setShow] = useState(false);
const[JsonData,setJsonData] = useState([]);
let navigate = useNavigate();


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


  return (
    <div className='SecondPageBackGround'>
    <h1 className='headerSecondPage'>View Characters list & bios!</h1>
    <hr className='hrPages'></hr>
    <div><InputField Input={Input} setInput={setInput} Show={Show} setShow={setShow} jsonData={JsonData}/></div>
    <button className='button' onClick={() => {
          navigate("/");
        }}>MainPage</button>
    </div>
  )
}




export default SecondPage;