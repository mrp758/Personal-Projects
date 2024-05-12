import React, { useState,useEffect } from 'react';
import {useNavigate,useParams} from 'react-router-dom';

function AdminData() {

const[AdminData,setAdminData] = useState([]);
const[EnableDelete,setEnableDelete] = useState(false);
const[Text,setText] = useState("Enable");
let navigate = useNavigate();
document.title = "AdminArea";
const {role} = useParams();

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
            setAdminData(data.userAccount);
      }
        })})
  },[]);
  
  
  function deleteItemsFromFile(id){
    if(AdminData.length !== 0 || AdminData.length !== null){
    fetch('http://localhost:5000/delete/' + id, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          const jsonPromise = response.json();
          jsonPromise.then((data) => {
            console.log(`data deleted: ${data}`)
          })})
  }
  }



function handleDeleteUser(id){
    setAdminData(AdminData.filter((key,value) => key.id !== id));
    deleteItemsFromFile(id);
 };



function enableDeleteUser(){
    if(EnableDelete === false){
        setEnableDelete(true);
        setText("Enabled");
    }
    else if(EnableDelete === true){
        setEnableDelete(false);
        setText("Disabled");
    }
 };




function ShowData(){
        return(
        <div>
        {   
            AdminData.map(value =>{
                if(value.roleAdmin !== "admin" || value.roleAdmin !== "Admin"){
                return(
                    <div key={value.id}>
                        <p>UserName: {value.userName}  passWord: {value.passWord}</p> <p>Role: {value.role}</p> <p>isAdmin: {value.roleAdmin}</p><button onClick={() => {if(EnableDelete === true){handleDeleteUser(value.id)}}}> Delete Account</button>
                    </div>
                )}
                else if(role === value.roleAdmin){
                    return(
                        <div key={value.id}>
                            <p>UserName: {value.userName}  passWord: {value.passWord}</p> <p>Role: {value.role}</p> <p>isAdmin: {value.roleAdmin}</p><button onClick={() => {if(EnableDelete === true){handleDeleteUser(value.id)}}}> Delete Account</button>
                        </div>
                    )
                }
            })
        }
        </div>
        )
    }

  return (
    <div>
        <button onClick={() =>{
            navigate("/");
        }}>Login</button>
        <h1>Admin DataBase</h1>
        <button onClick={enableDeleteUser}>{Text}</button>
        <div>{ShowData()}</div>
    </div>
    
  )
}



export default AdminData;