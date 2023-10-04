import React from 'react'
import './Popup.css'

const Popup = ({open, onclose}) => {
    if (!open) return null;
    return (
        <div className='popup'>
            <div className='popup-inner'>
                <p onClick={onclose} className='close-popup'>X</p>
                <div className='info'>
                <h1>แนะนำเกม</h1><br></br>
                    <a>1.ทำการสมัครหรือเข้าสู่ระบบก่อนใช้งาน</a><br></br>
                    <a>2.เริ่มทำภารกิจโดยการใช้ข้อมูลของ Strava</a><br></br>
                    <a>3.เมื่อทำภารกิจสำเร็จจะได้รับแต้มไปซื้อของในร้านค้าในหน้าหลัก</a><br></br>
                    <a>4.สามารถต่อสู้กับบอสเพื่อจัดอันดับและเอาแต้มไปแลกสินค้า</a>
                </div>
            </div>
        </div>
    )
}

export default Popup;