import React from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './itemPopup.css'

const ItemPopup = (props) => {
    const {data, closeClick} = props;

    const buyItem = () => {
      const token = localStorage.getItem('token');
      axios.post(
          'http://localhost:5000/auth',{
  
          },
          {
          headers: {Authorization : `Bearer ${token}`}
          }).then(res => {
            if(res.data.status === 'ok'){
              axios.post('http://localhost:5000/additem',{
                u_id: res.data.user[0].u_id,
                I_id: data.I_id,
                I_point: data.I_point
          }
          ).then(res => {
            if(res.data.status === '2'){
              alert('แต้มของคุณไม่พอ')
            }
            if(res.data.status === 'ok'){
              alert('ซื้อสำเร็จ')
              closeClick(null)
            }
          })
            }
          })
          .catch((err) => console.log("ERROR", err));
    }

  return (
    <div className='popup-profile'>
        <div className='popup-inner-profile'>
                <div className='itemDetail'>
                    <img src= {data.ci_image} />
                    <p>{data.I_name}</p>
                <div className='Button'>
                  <Button variant='success' onClick={() => buyItem()}>ซื้อ</Button>
                  <Button variant='warning' onClick={closeClick}>ยกเลิก</Button>
                </div>
                </div>
        </div>
    </div>
  )
}

export default ItemPopup