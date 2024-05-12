import React from 'react'

export default function MessageToUser(props) {
  const {messagningNumber,enteredUserName} = props;
  
  function returnMessage(messageType,user){
    if(messageType == 1){
        console.log(messageType);
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
                <p>This user {user} can't be admin!</p>
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
                    user by the name {user} have been added
                </p>
            </div>
        );
    }

  }
  return (
    <div>{returnMessage(messagningNumber,enteredUserName)}</div>
  )
}
