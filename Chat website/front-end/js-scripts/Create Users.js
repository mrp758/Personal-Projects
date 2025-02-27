
import { createUsers } from '../../backend-js/api-handler.js';

document.addEventListener('DOMContentLoaded',  function() {

    const registerButton = document.getElementById("CreateBtn");
    const logOutButton = document.getElementById("logOutBtn");
    const username = document.getElementById("CreateU");
    const password = document.getElementById("CreateP");
    let onError,onSuccess;

    


    registerButton.addEventListener("click", async function(){
       
        if (onSuccess) {
            onSuccess.remove();
            onSuccess = null;
        }
    
        if (onError) {
            onError.remove();
            onError = null;
        }

            if(username.value !== "" && password.value !== ""){
                 const statusRequest = await createUsers(username.value, password.value, []);


                if(statusRequest == true){
                    onSuccess = document.createElement("h4");
                    onSuccess.innerText = "Username and Password created !!!!";
                    document.body.appendChild(onSuccess);
                }
                else{
                    onError = document.createElement("p");
                    onError.innerText = `${statusRequest.error}`;
                    document.body.appendChild(onError);

                }

                username.value  = "";
                password.value  = "";
            }

            else  if(username.value === "" && password.value === ""){

                if(!onError){
                    onError = document.createElement("p");
                    onError.innerText = "Username and Password can't be blank";
                    document.body.appendChild(onError);
                }

                username.value  = "";
                password.value  = "";
            }

            else if(username.value == ""){
                
                if(!onError){
                    onError = document.createElement("p");
                    onError.innerText = "Username can't be blank";
                    document.body.appendChild(onError);
                }
                username.value  = "";
                password.value  = "";


            }

            else{
                
               if(!onError){
                    onError = document.createElement("p");
                    onError.innerText = "Password can't be blank";
                    document.body.appendChild(onError);
               }
                username.value  = "";
                password.value  = "";
            }
        });


        logOutButton.addEventListener("click",function(){

            window.location.href = "/";
        });

    });

