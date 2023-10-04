import React, {useState} from "react";
import axios from 'axios';
import "./Login.css";
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

let animateButton = function(e) {
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },10000);
  };
  

const Login = ({open, onclose}) => {
    const navigator = useNavigate();
    const [input, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:5000/login', 
        {
            u_email: input.email,
            u_password: input.password
        }           
        )
        .then(res => {
            if (res.data.status === 'ok'){
                localStorage.setItem('token', res.data.token)
                navigator('/home')
            }else {
                alert('login failed')
            }
        })
        
    }

    if (!open) return null;
    return (
        <div className='popup'>
            <div className='popup-inner'>
            <h1 className="login-header">เข้าสู่ระบบ</h1><br></br>
                <p onClick={onclose} className='close-popup'>X</p>
                <form className='input' onSubmit={handleSubmit}>
                    <label>อีเมล</label>
                    <div className="login-email-input">
                        <input 
                            name="email"
                            required
                            type="text"
                            className="login-input"
                            placeholder="Enter an Email"
                            value={input.email || ""}
                            onChange={handleChange}
                            >
                        </input>
                    </div>
                    <label>รหัสผ่าน</label>
                    <div className="login-password-input">
                        <input 
                            name="password"
                            required
                            type="password"
                            className="login-input"
                            placeholder="Enter a Password"
                            value={input.password || ""}
                            onChange={handleChange}
                            >
                        </input>
                    </div>
                    <div className="login-btn">
                        <button class="bubbly-button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;