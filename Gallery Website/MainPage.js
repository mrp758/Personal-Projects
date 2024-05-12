import React  from 'react';
import {handleMain,Storage} from './FecthingData';
import {useNavigate} from 'react-router-dom';
import '../css/InputData.css';
function MainPage() {
  let navigate = useNavigate();
  return (
    <div className='MainBackGround'>
        <h1 className='HeaderMain'><strong>Batman Arkham Games Info</strong></h1>
        <hr className='hrPages'></hr>
        <p className='MainText'>The Batman: Arkham Series is a video game series, starting with Batman: Arkham Asylum in 2009. The series had two developers, Rocksteady Studios who developed Batman: Arkham Asylum in 2009, Batman: Arkham City in 2011, Batman: Arkham Knight in 2015 and Suicide Squad: Kill the Justice League set to be released in 2022. WB Montreal developed Batman: Arkham Origins in 2013.</p>
        <div>{handleMain()}</div>
        <p className='MainText'>In this website we will cover most of the Arkham characters in the series most known and the least known to players that missed/never heard of the characters and their story in the Arkham series.</p>
        <button className='button' onClick={() => {
          navigate("/SecondPage");
        }}>SecondPage</button>
        <div>{Storage()}</div>
    </div>
  )
}

export default MainPage;
