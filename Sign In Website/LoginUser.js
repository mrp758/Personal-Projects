import React, { useState,useEffect } from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import '../css/Login.css';

export default function LoginUser() {
const[user,setUser] = useState("");
const[password,setPassword] = useState("");
const [userData, setUserData] = useState([]);
const [isLogged, setIsLogged] = useState(false);
let navigate = useNavigate();
document.title = "LoginPage";

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
            setUserData(data.userAccount);
      }
        })})
  },[])
  

function handleInputUR(event){
    setUser(event.target.value);
    setIsLogged(false);
}

function handleInputPS(event){
    setPassword(event.target.value);
    setIsLogged(false);
}


function handleLogin(){
     setIsLogged(true);
}



function WelcomeUser(){
    if(isLogged === true && user !== "" && password !== ""){
        return(
            <div>
                {
                    userData.map(value =>{
                        if(value.userName === user && value.passWord === password &&  value.roleAdmin === "Admin" || value.roleAdmin === "admin"){
                            return(
                                <div key={value.id}>
                                    <p>Hello {value.userName},You're Logged in!</p>
                                <button onClick={() =>{
                                     navigate(`/Admin/${value.roleAdmin}`);
                                 }}>Admin</button>
                                 <img className="Logo" src='./Images/LogingPageLogo.jpg' alt="Photo of kali linux opreating system, Circling 360 degrees"/>
                                  </div> 
                            )
                        }
                        else if(value.userName === user && value.passWord ===  password && value.roleAdmin !== "admin" && value.role === "subAdmin" || value.role === "subadmin"){
                            return(
                                <div key={value.id}>
                                    <p>Hello subAdmin {value.userName},You're Logged in!</p>
                                    <button onClick={() =>{
                                     navigate(`/Admin/${value.role}`);
                                 }}>Admin</button>
                                 <img className="Logo" src='./Images/LogingPageLogo.jpg' alt="Photo of kali linux opreating system, Circling 360 degrees"/>
                                </div>
                            )
                        }
                        else if(value.userName  === user && value.passWord ===  password && value.roleAdmin !== "admin" || value.roleAdmin !== "Admin"){
                        return(
                            <div key={value.id}>
                                <p>Hello {value.userName},You're Logged in!</p>
                            </div>
                        )
                    }
                })
                }
                </div>
                )
}
}



  return (
   <div>
    <input type='textbox' value={user} onChange={handleInputUR} placeholder="Enter user name"></input>
    <input type='password' value={password} onChange={handleInputPS} placeholder="Enter password"></input>
    <button onClick={handleLogin}>Login</button>
    <button onClick={() => {
          navigate("/CreateUser");
        }}>Create New User</button>
    <div>{WelcomeUser()}</div>
   </div>
  )
}




