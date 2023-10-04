import React,{useState, useEffect} from 'react'
import axios from 'axios';
import './shop.css'
import Item from '../../component/Item'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const [user, setUser] = useState([]);
  const navigator = useNavigate();

  const onClickBack = () => {
    navigator('/home');
  }

  useEffect(() => {
        
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      axios.post(
        'http://localhost:5000/auth',{

        },
        {
        headers: {Authorization : `Bearer ${token}`}
        }).then(res => {
                setUser(res.data.user);
            })
            .catch((err) => console.log("ERROR", err));
    },1000);

    return () => clearInterval(interval);
}
,[])

  return (
    <div className='main'>
      <div className='user-profile2'>
        <button onClick={() => onClickBack()}>Back</button>
              {user.map((val, key) =>{
                  return(
                    <div key={'user_'+val.ci_image+val.u_firstname+val.u_point} className='user-info'>
                      <div className='all'>
                        <img className='pic' src={val.ci_image}/>
                        <div className='user-body'>
                          <p className='user-text-name'>{val.u_firstname}</p>
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
      <div className='shop'>
        <div className='user'>
          {user.map((val) => {
            return(
              <div className='pic'>
                  <img src={val.ci_image}/>
              </div>
            )
          })}
        </div>
        <Item/>
      </div>
    </div>
  )
}

export default Shop