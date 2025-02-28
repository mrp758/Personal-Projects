
import { getUserTweets,saveUserTweets } from "../../backend-js/api-handler.js";


const currentUser = window.location.href.split("=")[1];

    document.addEventListener('DOMContentLoaded', async function() {

        const tweetsInput = document.getElementById("tweetBox");
        const submitTweet = document.getElementById("tweetBtn");
        const logOut = document.getElementById("logOutBtn");
        let areaOfTweets = document.createElement("div");
        let onError;


        if(currentUser !== null){

        
        const savedTweets =  await getUserTweets();

        function displaySavedTweets(dbData,areaBlock){

            areaBlock.innerHTML = '';

            for(const element of dbData){

                if(element.postedTweets.length > 0){

                    let userElement = document.createElement("h3");
                    userElement.setAttribute('id', `user-${element.username}`);
                    userElement.innerText = element.username;
                    areaBlock.appendChild(userElement);

                    element.postedTweets.forEach(tweet => {
                    document.createElement("ul");
                    let tweetElement = document.createElement("li");
                    tweetElement.setAttribute('id', `li-${element.username}`);
                    tweetElement.innerText = tweet; 
                    areaBlock.appendChild(tweetElement);
                    });


                    }
            }
            document.body.appendChild(areaBlock);
        }


        displaySavedTweets(savedTweets,areaOfTweets);


        let userBlock = document.querySelector(`#user-${currentUser}`);
        let userTweet = document.querySelector(`#li-${currentUser}`);


            submitTweet.addEventListener("click",function(){

            if(tweetsInput.value !== ""){

                saveUserTweets(currentUser,tweetsInput.value);

                if (onError) {
                    onError.remove();
                    onError = null;
                }

                if(userBlock == null){
                    let userPoster = document.createElement("h3");
                    let tweets = document.createElement("li");
                    userPoster.setAttribute('id', `user-${currentUser}`);


                    userPoster.innerText = currentUser;
                    tweets.innerText = tweetsInput.value;
                    
                    if(areaOfTweets.querySelector(`#user-${currentUser}`) == null){
                        areaOfTweets.appendChild(userPoster);
                    }

                    areaOfTweets.appendChild(tweets);
                    document.body.appendChild(areaOfTweets);
                }
            
                else{

                    let tweets = document.createElement("li");
                    tweets.innerText = tweetsInput.value;
                    userTweet.appendChild(tweets);
                }
                tweetsInput.value = "";
            }




            else{

                if(!onError){
                    onError = document.createElement("p");
                    onError.innerText = "Input can't be empty";
                    document.body.appendChild(onError);
                }
            }

            });

        }

        logOut.addEventListener("click",function(){
            window.location.href = "/logOut";
            localStorage.clear();

        });
        
    });


