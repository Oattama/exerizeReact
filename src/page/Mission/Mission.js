import React ,{useEffect, useState} from 'react';
import {Container, Row, Tabs, Tab} from 'react-bootstrap'; 
import './Mission.css';
import axios from 'axios';
import ProgressBar from '../../component/ProgressBar';
import History from '../History/History';
import BMI from '../BMI/BMI';

const Mission = ({open, onclose}) => {
    const [missionList, setMissionList] = useState([]);

    useEffect(() => {
      
      const interval = setInterval(() => {
        const token = localStorage.getItem('token');
          axios.post(
            'http://localhost:5000/auth',{

            },
            {
            headers: {Authorization : `Bearer ${token}`}
            }).then(res => {
              if(res.data.status === 'ok'){
                axios.post('http://localhost:5000/mission',{
                  u_id: res.data.user[0].u_id
            }).then(res => {
              if(res.data.status === 'ok'){
                setMissionList(res.data.mission);
              }
              if(res.data.status === 'ok2'){
                setMissionList(res.data.Values);
              }
            })
              }
            })
            
            .catch((err) => console.log("ERROR", err));
      },10000)

      return () => clearInterval(interval)
    }, [])

    if(!open) return null;
  return (
    <div className='popup-mission'>
        <div className='popup-inner-mission'>
            <p onClick={onclose} className='close-popup'>X</p>
            <Container className='py-5'>
              <Row className='justify-content-center'>
                <Tabs justify variant='pills' defaultActiveKey="tab-1" className='mb-1 p-0'>
                  <Tab eventKey="tab-1" title="Daily mission">
                  <div className='mission-info'>
                      <div className='mission-list'>
                      {missionList.map((val, key) =>{
                        return(
                          <div key={'missionList_'+val.m_name+val.t_target
                            + val.distance + val.r_point + val.r_exp} className='mission card'>
                            <div className='mission-card'>
                              <div className='card-body'>
                                <p className='card-text'>{val.m_name}</p>
                                <div className='card-text-target'>
                                  <ProgressBar value={val.distance} max={val.t_target}/>
                                  <p className='card-text'>{val.distance}</p>
                                  <p className='card-text'>/{val.t_target}</p>
                                  <p className='card-text'>เมตร</p>
                                </div>
                                <div className='card-text-reward'>
                                  <p className='card-text'>Reward: {val.r_point}</p>
                                  <p className='card-text'>Point,</p>
                                  <p className='card-text'>{val.r_exp}</p>
                                  <p className='card-text'>EXP</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      </div>
                  </div>
                  </Tab>
                  <Tab eventKey="tab-3" title="History">
                    <History/>
                  </Tab>
                  <Tab eventKey="tab-4" title="BMI">
                    <BMI/>
                  </Tab>
                </Tabs>
              </Row>
            </Container>
        </div>
    </div>
  )
}

export default Mission;