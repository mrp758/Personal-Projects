import React,{useEffect,useState} from 'react';
import data from './data.json';
import '../css/InputData.css';



export function handleMain(){
        return(
          <div>
          {
            data.map((value) =>{
              if(value.id === 1){
              return(
                <div key={value.id}>
                   <div>
                          <img src={value.Image} className='MainPageImage' />
                    </div>
                </div>
            )}})
            
          }
          </div>
        )
}



export function Storage(){
  const[JsonData,setJsonData] = useState([]);

    useEffect(() =>{

      fetch('http://localhost:5000/get-Selected-Data', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
          const jsonPromise = response.json();
          jsonPromise.then((data) => {
            if(data != null){
              setJsonData(data);
        }
          })})
    },[])
    

  return(
    <div>
    <h2><strong>Saved Selected Images</strong></h2>
    <div>
          {
            JsonData.map((ImageSelected,key) =>{
              if(ImageSelected != null || ImageSelected != ""){
              return(
                <div key={key}>
                   <div>
                          <img src={ImageSelected.Images} className='SavedImages'/>
                    </div>
                </div>
            )}})
            
          }
          </div>
    </div>
  )
}


