import React, { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom';


function CreateUser() {
const[accounts, setAccounts] = useState([]);
const[role, setRole] = useState("");
const[roleAdmin, setRoleAdmin] = useState("");
const[user,setUser] = useState("");
const[password,setPassword] = useState("");
const[usersDataFromFile,setUsersDataFromFile] = useState([]);
const[detectErrorOnUser,setDetectErrorOnUser] = useState("");
const[messagningNumber,setMessagningNumber] = useState(0);
let navigate = useNavigate();
document.title = "CreateUser";





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
          setUsersDataFromFile(data.userAccount);
    }
      })})
},[])


useEffect(() => {
  if(accounts.length > 0 && detectErrorOnUser != "DisablePost"){
      fetch('http://localhost:5000/post', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userAccount:accounts})
    })
  }
}, [accounts]);




function returnMessage(messageType){
  if(messageType == 1){
      return(
          <div>
              <p>
              Some fields are empty please fill them!
              </p>
          </div>
      );
  }
  else if(messageType == 2){
      return(
          <div>
              <p>This user can't be admin!</p>
          </div>
      );
  }

  else if(messageType == 3){
      return(
          <div>
              <p>
                  Can't have any more subAdmins!
              </p>
          </div>
      );
  }

  else if(messageType == 4){
      return(
          <div>
              <p>
                  user have been added
              </p>
          </div>
      );
  }
}




function add(){
    setAccounts([...accounts, {id : uuidv4(), userName : user, passWord: password, roleAdmin : roleAdmin, role : role}]);
    setUser("");
    setPassword("");
    setRole("");
    setRoleAdmin("");
    usersDataFromFile.map((value,key) =>{
      if(user == "" || password == "" || role == ""){
        //alert("Some fields are empty please fill them");
        setDetectErrorOnUser("DisablePost");
        returnMessage(setMessagningNumber(1));
        
      }
      else if(roleAdmin == "admin" && [...usersDataFromFile][0].roleAdmin === "admin" || roleAdmin == "Admin" && [...usersDataFromFile][0].roleAdmin === "Admin"){
        //alert(`This user ${user} can't be admin!`);
        setDetectErrorOnUser("DisablePost");
        returnMessage(setMessagningNumber(2));
      }
      else if(role == "subadmin" && [...usersDataFromFile][4].role === "subadmin" || role == "subAdmin" && [...usersDataFromFile][4].role === "subAdmin"){
        //alert("Can't have any more subAdmins!");
        setDetectErrorOnUser("DisablePost");
        returnMessage(setMessagningNumber(3));
      }
      else{
        //alert("user added");
        setDetectErrorOnUser("");
        returnMessage(setMessagningNumber(4));
      }
    })
}


function handleClick(){
  return add();
}


function handleInputUR(event){
  setUser(event.target.value);
}

function handleInputPS(event){
  setPassword(event.target.value);
}

function handleInputRL(event){
  setRole(event.target.value);
}

function handleInputRLAD(event){
  setRoleAdmin(event.target.value);
}






  return (
    <div>
      <input type='textbox' value={user} onChange={handleInputUR} placeholder="Enter user name"></input>
      <input type='password' value={password} onChange={handleInputPS} placeholder="Enter password"></input>
      <input type='textbox' value={role} onChange={handleInputRL} placeholder="Enter Role"></input>
      <input type='textbox' value={roleAdmin} onChange={handleInputRLAD} placeholder="Enter Role Admin"></input>
      <button onClick={handleClick}>Add a new Account</button>
      <button onClick={() => {
          navigate("/");
        }}>Back To Login</button>
        {returnMessage(messagningNumber,user)}
    </div>
  )
}



export default CreateUser;