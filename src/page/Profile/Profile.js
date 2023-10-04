import React ,{useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import './Profile.css';
import { useNavigate } from 'react-router-dom';



const Profile = ({open, onclose}) => {
  const navigator = useNavigate();

  const handleStrava = () => {
    window.open(
      `http://www.strava.com/oauth/authorize?client_id=92220&response_type=code&redirect_uri=http://localhost:3000/redirect/&scope=activity:read_all`
    )
  }

  const [userInfo, setUserInfo] = useState([]);
  const effectRan = useRef(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigator('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(effectRan.current){
      effectRan.current = false;
      axios.post(
        'http://localhost:5000/auth',{
  
        },
        {
        headers: {Authorization : `Bearer ${token}`}
        })
        .then(res => {
          if (res.data.status === 'ok'){
            axios.post(
              'http://localhost:5000/profile',
              {
                u_id: res.data.user[0].u_id
              } 
          ).then(res => {
            if(res.data.status === 'ok'){
              setUserInfo(res.data.user);
            }
          })
            
          }else {
              localStorage.removeItem('token');
              navigator('/')
          }
      })
      .catch((err) => console.log("ERROR", err));
    }
  },[])

  if(!open) return null;
  return (
    <div className='popup-profile'>
            <div className='popup-inner-profile'>
                <p onClick={onclose} className='close-popup'>X</p>
                <div className='user-profile'>
                  <div className='info'>
                    {userInfo.map((val,key) => {
                      return(
                        <div key={'userInfo_'+ val.ci_image+val.u_firstname +val.u_lastname+val.u_email+val.level} className='user-body-profile'>
                          <div className='user-pic'>
                            <img className='pic2' src={val.ci_image}/>
                          </div>
                          <div className='user-level'>
                            <p className='label'>Level</p>
                            <p className='label-1' >{val.level}</p>
                          </div>
                          <div className='description'>
                            <div className='form'>
                              <p className='label'>ชื่อ</p>
                              <p className='value-1'>{val.u_firstname}</p>
                            </div>
                            <div className='form'>
                              <p className='label'>นามสกุล</p>
                              <p className='value-2'>{val.u_lastname}</p>
                            </div>
                            <div className='form'>
                              <p className='label'>อีเมล</p>
                              <p className='value-3'>{val.u_email}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className='button-profile-A'>
                    <button class="bubbly-button" onClick={handleLogout}> Logout </button>
                  <div className='button-profile-B'>
                    <button class="bubbly-button" onClick={handleStrava}>Link to Strava</button>
                  </div>
                </div>
                </div>
            </div>
        </div>
  )
}

export default Profile