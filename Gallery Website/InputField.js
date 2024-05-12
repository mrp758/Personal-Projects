import React from 'react';
import '../css/InputData.css';
import {useNavigate} from 'react-router-dom';

function InputField(props) {
const{Input,setInput,Show,setShow,jsonData} = props;
let navigate = useNavigate();


function handleInput(event){
    setInput(event.target.value);
    setShow(false);
}

function handleClick(){
  setShow(true);
}



function displayData(){
    return(
        <div>
        {
            jsonData.filter((user_input) =>{
            if (user_input.name !== undefined) {
                
            if(Input === ""){
                  return user_input.isVisible;
            }
            else if(user_input.name.includes(Input) && Input === "origins" && Show) {
              return user_input;
            }
            else if(user_input.name.toLowerCase().includes(Input.toLowerCase()) && Show){
                return user_input.isVisible;
            }
          }
            }).map((value,key) =>{
            if(value.id !== 1 && value.id !== 34){
              return(
                <div key={key} className="align">
                   <div>
                    <img src={value.Image} className="image" onClick={() => {
                          navigate(`/Info/${value.id}`);
                         }
                    }/>
                    </div>
                </div>
            )}
            else if(value.id === 34){
              return(
                <div key={key} className="align">
                   <div>
                    <img src={value.DefaultImage} className="image" onClick={() => {
                         navigate(`/Game/${value.id}`);
                         }
                    }/>
                    </div>
                </div>
            )}})
            
          }
        </div>
    )
  }
  

  return (
    <div>
        <input type="textbox" placeholder="Search" value={Input} onChange={handleInput} className='input'></input>
        <button className="button" onClick={handleClick}>Search</button>
        <div>
            {displayData()}
        </div>
    </div>
  )
}

export default InputField;