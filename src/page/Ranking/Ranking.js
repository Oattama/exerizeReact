import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './Ranking.css'

const Ranking = ({open, onclose}) => {
    const [rankingList, setRankingList] = useState([]);
    const [searchUser, setSearchUser] = useState('');

    const filterUser = rankingList.filter((val) => {
        return val.u_firstname.includes(searchUser);
    })

    const topRank = rankingList.slice(0,1);
    const topRank1 = rankingList.slice(1,2);
    const topRank2= rankingList.slice(2,3);

    useEffect(() => {
        
        const interval = setInterval(() => {
            axios.get(
                'http://localhost:5000/ranking',{
          
                },
                {
                
                }).then(res => {
                    setRankingList(res.data.result);
                })
                .catch((err) => console.log("ERROR", err));
        },1000);

        return () => clearInterval(interval);
    }
    ,[])

    if(!open) return null;
  return (
    <div className='popup-ranking'>
        <div className='popup-inner-ranking'>
            <p onClick={onclose} className='close-popup'>X</p>
            <div className='topRank'>
                {topRank.map((val) => {
                    return(
                        <div key={'rankingList_'+val.rank+ val.u_firstname+ val.level} 
                            className='topThree'>
                            <p>Rank:{val.rank}</p>
                            <img src={val.ci_image}/>
                            <p>{val.u_firstname}</p>
                        </div> 
                    )
                })}
                <div className='topRank1'>
                {topRank1.map((val) => {
                    return(
                        <div key={'rankingList_'+val.rank+ val.u_firstname+ val.level} 
                            className='topThree'>
                            <p>Rank:{val.rank}</p>
                            <img src={val.ci_image}/>
                            <p>{val.u_firstname}</p>
                        </div> 
                    )
                })}
                </div>
                <div className='topRank2'>
                {topRank2.map((val) => {
                    return(
                        <div key={'rankingList_'+val.rank+ val.u_firstname+ val.level} 
                            className='topThree'>
                            <p>Rank:{val.rank}</p>
                            <img src={val.ci_image}/>
                            <p>{val.u_firstname}</p>
                        </div> 
                    )
                })}
                </div>
            </div>

            <div className='searchBox'>
                <input
                type="text"
                name="search"
                className="input"
                value={searchUser}
                onChange={(event) => {setSearchUser(event.target.value)}}></input>
            </div>
        <div className='ranking-info'>
            <div className='ranking-list'>
                {filterUser.map((val,index) =>{
                    return(
                        <div key={'rankingList_'+val.rank+ val.u_firstname+ val.level}
                            className='ranking card'>
                        <div className='ranking-card'>
                            <div className='card-body'>
                                    <div className='card-text'>
                                            <p>{val.rank}</p>
                                            <div className='user'>
                                                <img src={val.ci_image}/>
                                                <p>{val.u_firstname}</p>
                                            </div>
                                            <p>Lv:{val.level}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>

            </div>
        </div>
    </div>
  )
}

export default Ranking