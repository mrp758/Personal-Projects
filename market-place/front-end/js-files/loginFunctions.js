document.getElementById("loginForm").addEventListener("submit", async function(event){
  event.preventDefault();
  let errorMessage = document.createElement("p");
  let userToken =  JSON.parse(sessionStorage.getItem("token"));

  let userNameValue = document.getElementById("user_name").value;
  let passwordValue = document.getElementById("password").value;

  const formData = new FormData();
  
  if((userNameValue == null || userNameValue == " " || userNameValue == "") || (passwordValue == null || passwordValue == " " || passwordValue == "")){
    
    if(document.getElementById("errorMessageLogin")){
        document.getElementById("errorMessageLogin").remove();
    }
      errorMessage.setAttribute("id","errorMessageLogin");
      errorMessage.innerText = "username or password fields are empty!";
      document.body.appendChild(errorMessage);
      document.getElementById("loginForm").reset();
  }

  else{

      formData.append("user_name", userNameValue);
      formData.append("password", passwordValue);

      if(userToken == null){
        formData.append("jwt_token","None");
      }
      else{
        formData.append("jwt_token",userToken["access_token"]);
      }

    const response = await fetch("URL-PATH/login", {
    method: "POST",
    body: formData
    });


    if(document.getElementById("errorMessageLogin")){
        document.getElementById("errorMessageLogin").remove();
      }
  
  if(!response.ok){
      const error = await response.json();
      if(error["detail"]["message"] == "JWT token is not valid, Please login again to get a new JWT token"){
        sessionStorage.removeItem("token");
      }
      errorMessage.setAttribute("id","errorMessageLogin");
      errorMessage.innerText = JSON.stringify(error);
      document.body.appendChild(errorMessage);
      document.getElementById("loginForm").reset();
      
  }
  
  else{
      const token = await response.json();

      if(token["server_code"] == 200){
        document.getElementById("loginForm").reset();
        window.location.href = "/static/html-pages/adminPage.html";  
      }

      else{
        sessionStorage.setItem("token",JSON.stringify(token));
        document.getElementById("loginForm").reset();
        window.location.href = "/static/html-pages/adminPage.html";
      }
    }
  }

  
});
