
import { verfyAccount } from "../../backend-js/api-handler.js";

document.addEventListener('DOMContentLoaded', async function() {

    const loginButton = document.getElementById("LoginBtn");
    const registerButton = document.getElementById("RegisterBtn");
    const chatButton = document.getElementById("ChatBtn");
    const username = document.getElementById("LoginU");
    const password = document.getElementById("LoginP");
    let onError;

    registerButton.addEventListener("click", async function(){

        window.location.href = "/create-account";
    });


    loginButton.addEventListener("click", async function(){

            const checkError = await verfyAccount(username.value,password.value);
            

            if(onError != null && checkError != true){
                    onError.remove();
                    onError = null;
                    username.value  = "";
                    password.value  = "";
                }

            else{
                if(!onError && checkError != false){
                onError = document.createElement("p");
                onError.innerText = "Username or Password are incorrect";
                document.body.appendChild(onError);
                }
                username.value  = "";
                password.value  = "";
            }
        });

        chatButton.addEventListener("click",function(){
            window.location.href = `/messging-page?username=${encodeURIComponent(username.value)}`;
        });


    });