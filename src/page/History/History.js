import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './History.css'

const History = () => {
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
          const token = localStorage.getItem('token');

            axios.post(
                'http://localhost:5000/auth',{
          
                },
                {
                headers: {Authorization : `Bearer ${token}`}
                }).then(res => {
                    if (res.data.status === 'ok'){
                      axios.post(
                        'http://localhost:5000/history',
                        {
                          u_id: res.data.user[0].u_id
                        } 
                    ).then(res => {
                      if(res.data.status === 'ok'){
                        setHistoryList(res.data.info);
                      }
                    })  
                    }
                })
                .catch((err) => console.log("ERROR", err));
        },1000)

        return () => clearInterval(interval);
    },[])
  return (
    <div className='history-info'>
        <div className='history-list'>
            {historyList.map((val, key) =>{
                return(
                    <div key={'missionList_'+ val.m_name+ val.t_target+ val.r_point+ val.r_exp+ val.finish_date} 
                    className='history card'>
                    <div className='history-card'>
                        <div className='history-body'>
                            <p className='history-text'>{val.m_name}</p>
                                <div className='card-text-target'>
                                  <p className='card-text'>{val.t_target}</p>
                                  <p className='card-text'>meters</p>
                                </div>
                                <div className='card-text-reward'>
                                  <p className='card-text'>Reward: {val.r_point}</p>
                                  <p className='card-text'>Point,</p>
                                  <p className='card-text'>{val.r_exp}</p>
                                  <p className='card-text'>EXP</p>
                                </div>
                                <div className='finish-date'>
                                  <p className='card-text'>FinishDate</p>
                                  <p className='card-text'>{val.finish_date}</p>
                                </div>
                              </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
  )
}

export default History