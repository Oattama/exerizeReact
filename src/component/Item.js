import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './item.css'
import { Button } from 'react-bootstrap';
import ItemPopup from './ItemPopup';

const Item = () => {
  const [item, setItem] = useState([]);
  const [openItem, setOpenItem] = useState(null);

  const [searchItem, setSearchItem] = useState('');

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
            axios.post('http://localhost:5000/item',{
              u_id: res.data.user[0].u_id
        }).then(res => {
          if(res.data.status === 'ok'){
            setItem(res.data.result);
          }
        })
          }
        })
        .catch((err) => console.log("ERROR", err));
      }, 1000)

      return () => clearInterval(interval);
  },[])

  const filterItem = item.filter((val) => {
    return val.I_name.includes(searchItem);
})

  const onItemClose = () => {
    setOpenItem(null);
  }

  const onItemOpen = (data) =>{
    setOpenItem(data)
  }

  let ItemPost = null;
  if(!!openItem) {
    ItemPost = <ItemPopup data={openItem} closeClick={onItemClose}/>
  }

  const onItemChange = (val) => {

    const itemId = val.I_id;
    const token = localStorage.getItem('token');
      axios.post(
          'http://localhost:5000/auth',{
  
          },
          {
          headers: {Authorization : `Bearer ${token}`}
          }).then(res => {
            if(res.data.status === 'ok'){
              axios.post('http://localhost:5000/changeItem',{
                u_id: res.data.user[0].u_id,
                I_id: itemId,
                I_id2: res.data.user[0].I_id
          })
            }
          })
          .catch((err) => console.log("ERROR", err));
  }

  return (
    <div className='shop01'>
    
    <div className='searchBox'>
                <input
                type="text"
                name="search"
                className="input"
                value={searchItem}
                onChange={(event) => {setSearchItem(event.target.value)}}></input>
            </div>

            <div className='item'>
                {filterItem.map((val, index) => {
                  let status = val.status;
                  switch (status){
                    case 0:
                      return (
                        <div className='item-detail'>
                          <p >{val.I_name}</p>
                          <img  src={val.ci_image}/>
                          <Button variant='warning' onClick={() => onItemOpen(val)}>{val.I_point}</Button>
                        </div>
                      )
                    case "equipped":
                      return(
                        <div className='item-detail'>
                          <p>{val.I_name}</p>
                          <img src={val.ci_image}/>
                          <Button variant='secondary' disabled>สวมใส่</Button>
                        </div>
                      )  
                    default:
                      return(
                        <div className='item-detail'>
                          <p>{val.I_name}</p>
                          <img src={val.ci_image}/>
                          <Button variant='success' onClick={() => onItemChange(val)}>ยังไม่ได้สวมใส่</Button>
                        </div>
                      )
                  }
                })}
        </div>
        {ItemPost}
    </div>
  )
}

export default Item