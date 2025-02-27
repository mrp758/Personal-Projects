
const apiUrl = "http://localhost:5000";




export  async function createUsers(recivedUsername,recivedPassword,recivedTweets) {
    const response = await fetch(`${apiUrl}/api/create-new-users`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({username:recivedUsername,password:recivedPassword,postedTweets:recivedTweets})
    });

    if(!response.ok){
        const errorMessage = await response.json();
        console.log(errorMessage);
        console.log("There was a problem posting data");
        return errorMessage;
    }
    else{
        console.log("Data has been posted to the database");
        return true;
    }
}



export async function saveUserTweets(recivedUsername,recivedTweets) {
    const response = await fetch(`${apiUrl}/api/save-users-tweets`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username:recivedUsername,postedTweets:recivedTweets})
    });

    if(!response.ok){
        console.log("There was a problem posting data");
    }
    else{
        console.log("Data has been posted to the database");
    }
}




export async function verfyAccount(recivedUsername,recivedPassword) {
    const response = await fetch(`${apiUrl}/api/users-accounts`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({username:recivedUsername,password:recivedPassword})
    });
   

    if(!response.ok){
        return true;
    }
    else{
       window.location.href = response.url;
       return false;
    }
}


export async function getUserTweets() {
    const response = await fetch(`${apiUrl}/api/users-tweets`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
        });
        if(!response.ok){
            console.log("There was a problem getting data");
        }

        else{
            const recivedData = await response.json();
            return recivedData;
        }
}
