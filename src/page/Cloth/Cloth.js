import React ,{useEffect, useState, useRef} from 'react';
import {Container, Row, Tabs, Tab} from 'react-bootstrap'; 
import './Cloth.css';
import axios from 'axios';
import ProgressBar from '../../component/ProgressBar';
import History from '../History/History';

const Cloth = ({open, onclose}) => {
    const effectRan = useRef(true);
    const [missionList, setMissionList] = useState([]);

    useEffect(() => {
      if(effectRan.current){
        effectRan.current = false;

        const token = localStorage.getItem('token');

      axios.get('http://localhost:5000/cloth',{
        headers: {Authorization : `Bearer ${token}`}
      })
      .then(res => {
        if(res.data.status === 'ok'){
          setMissionList(res.data.mission);
        }
        if(res.data.status === 'ok2'){
          setMissionList(res.data.Values);
        }
        
      })
      .catch((err) => console.log("ERROR", err));
      
      }
      
    }, [])

    if(!open) return null;
  return (
    <div className='popup-mission'>
        <div className='popup-inner-mission'>
           <div className="container-mission">
            <p onClick={onclose} className='close-popup'>X</p>
            <Container className='py-5'>
              <Row className='justify-content-center'>
                  <div className='mission-info'>
                      <div className='mission-list'>
                      {missionList.map((val, key) =>{
                        return(
                            <div className='mission card'>
                            <div className='mission-card'>
                              <div className='card-body'>
                                <p className='card-text'>เสื้อตัวที่ 1</p>
                                <div className='card-text-images'>
                                <img className="small" src="/images/A0"/>
                                <div className='card-text-price'>
                                  <p className='card-text'>10000 Point</p>
                                </div>
                                <button onClick >buy</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        )
                      })}
                      </div>
                  </div>
                  
                  
                
              </Row>
            </Container>
        </div>
        </div>

    </div>
  )
}

export default Cloth;