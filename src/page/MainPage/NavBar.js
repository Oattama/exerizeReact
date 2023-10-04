import React from 'react';
import './NavBar.css';
import Popup from './Popup';
import { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';


function AppNavBar() {
    const [openPopup, setOpenPopup] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openRegister, setOpenRegister] = useState(false)

 
    return(
        <div className='header'>
          <div className='header-con'>
                        <div className='logo'>
                            <img className='Logo-header' src='/images/Logo.png'></img>
                        </div>
                        <h1 className='exerize'>exerize</h1>
                        <ul className="menu">
                            <li className='menu-link'>
                                <a href='#' onClick={() => setOpenPopup(true)}>แนะนำเกม</a>
                                <Popup open={openPopup} onclose={() => setOpenPopup(false)}/>
                            </li>
                            <li className='menu-link'>
                                <b href='#' onClick={() => setOpenPopup(true)}>l</b>
                            </li>
                            <li className='menu-link'>
                                <a href='#' onClick={() => setOpenRegister(true)}>สมัครไอดี</a>
                                <Register open={openRegister} onclose={() => setOpenRegister(false)}/>
                            </li>
                            <li className='menu-link'>
                                <b href='#' onClick={() => setOpenPopup(true)}>l</b>
                            </li>
                            <li className='menu-link'>
                                <a href='#' onClick={() => setOpenLogin(true)}>เข้าสู่ระบบ</a>
                                <Login open={openLogin} onclose={() => setOpenLogin(false)}/>
                            </li>
                        </ul>
                    </div>
            </div>
       
    )
}
export default AppNavBar;