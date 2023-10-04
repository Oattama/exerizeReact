import React,{ useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import './Strava.css'

const Strava = () => {
  const effectRan = useRef(true);
  const navigator = useNavigate();
  const token = localStorage.getItem('token');
  const [searchParams, setSearchParam] = useSearchParams([]);
  const code = searchParams.get("code");

const handleHomePage = () => {
    navigator('/home')
}

useEffect(() => {
  if(effectRan.current){
    effectRan.current = false;
    axios.post(
      'http://localhost:5000/auth',{
  
      },
      {
        headers: {Authorization : `Bearer ${token}`}
      }
    ).then(res => {
      if(res.data.status === 'ok'){
        axios.post(
          'http://localhost:5000/strava',
          {
            u_email: res.data.user[0].u_email,
            code: code
          } 
      )
      }
    }).catch((err) => console.log("ERROR", err));
  }
    
},[])

  return (
    <div className='main'>
         <img className="home-ST" src="/images/Room01.png"/>
      <div className='container'>
        <div className='strava-content'>
           <p>Link with Strava successfully</p><br></br>
           <img className="strava-img"src="/images/icon.png"/>
           <button class="bubbly-button"  onClick={handleHomePage}>Back to Homepage</button>
        </div>
      </div>
    </div>
    
  )
}

export default Strava