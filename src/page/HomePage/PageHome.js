import axios from 'axios';
import React,{useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../component/ProgressBar';
import Mission from '../Mission/Mission';
import Profile from '../Profile/Profile';
import Ranking from '../Ranking/Ranking';
import './Home.css';

const PageHome = () => {
  const [openMission, setOpenMission] = useState(false);
  const [openRanking, setOpenRanking] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const navigator = useNavigate();
  
  useEffect(() => {

      const interval = setInterval(() => {
      const token = localStorage.getItem('token');
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
      }, 500);
      return () => clearInterval(interval);
  }
  , [])

  return (
    <div className='main'>
      {/*-----------------navbar-------------------*/}
      <div className='header-home'>
        <div className='navbar-home'>
          <ul className='menu-home'>
            <li className='menu-link'>
              <a href='/shop'>คลังเก็บของ</a>
            </li>
            <li className='menu-link'>
              <a href='#' onClick={() => setOpenMission(true)}>ภารกิจ</a>
              <Mission open={openMission} onclose={() => setOpenMission(false)}/>
            </li>
            <li className='menu-link'>
              <a href='#' onClick={() => setOpenRanking(true)}>แรงค์กิ้ง</a>
              <Ranking open={openRanking} onclose={() => setOpenRanking(false)}/>
            </li>
            {/*-----------------navbar-------------------*/}

            {/*-----------------user-profile-------------------*/}
            <li className='menu-link'>
              <div className='user-profile'>
              {userInfo.map((val, key) =>{
                  return(
                    <div key={'userInfo_'+val.ci_image+val.u_firstname+val.u_point} className='user-info'>
                      <div className='all'>
                        <img className='pic' src={val.ci_image}/>
                        <div className='user-body'>
                          <p className='user-text-name' href='#' onClick={() => setOpenProfile(true)}>{val.u_firstname}</p>
                          <Profile open={openProfile} onclose={() => setOpenProfile(false)}/>
                          <div className='user-point'>
                            <p className='user-text'>Point:</p>
                            <p className='user-text'>{val.u_point}</p>
                          </div>
                        </div>
                        </div>
                    </div>
                  )
                })}
              </div> 
            </li>
            {/*-----------------user-profile-------------------*/}
          </ul>     
        </div>
      </div>
     <img className="home-bg" src="/images/Room01.png"/>
      <div className='user-content'>
      <div className='level'>
          {userInfo.map((val,key) => {
            return(
              <div key={'userInfo_' + val.level + val.exp + val.expSt + val.u_picture} className='character-info'>
              <div className='exp-bar'>
                <p className='level-text'>Lv: {val.level}</p>
                <div className='exp'>
                  <ProgressBar value={val.exp} max={val.expSt}/>
                </div>
                <p className='exp-text'>{val.exp}</p>
                <p className='exp-text'>/{val.expSt}</p>
              </div>
              <div className='character'>
                <img src={val.ci_image} alt='character'/>
              </div>
            </div>
            )
          })}
      </div>
      </div>
    </div>
  )
}

export default PageHome;