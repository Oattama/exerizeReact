import React, {useState} from "react";
import "./Register.css"
import axios from "axios";
import Button from "react-bootstrap/Button";

const Register = ({open, onclose}) => {
    const [input, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = ( ) =>{
        const {password, confirmpassword} = input;
        if(password !== confirmpassword){
            alert("Password is not match");
        }
        else{
            axios.post('http://localhost:5000/register',
                {
                    u_firstname: input.firstname,
                    u_lastname: input.lastname,
                    u_email: input.email,
                    u_password: input.password
                }
            ).then(res => {
                if (res.data.status === 'error'){
                    alert('this email has already use')
                }
                else{
                    if (res.data.status === 'ok'){
                        alert('success')
                        onclose(false);
                    }else {
                        alert('signUp failed')
                    }
                }
            });  
        }  
        }  

    if (!open) return null;
    return(
        <div className="popup">
            <div className="popup-inner">
                <p onClick={onclose} className="close-popup">X</p>
                <form className='input' onSubmit={handleSubmit}>
                    <h1>สมัครไอดี</h1><br></br>
                    <label>ชื่อจริง</label>
                        <div className="Register-firstname-input">
                            <input 
                                required
                                type="text"
                                name='firstname'
                                className="input"
                                placeholder="firstname"
                                value={input.firstname || ""}
                                onChange={handleChange}
                                >
                            </input>
                        </div>
                        <label>นามสกุล</label>
                        <div className="Register-lastname-input">
                            <input 
                                required
                                type="text"
                                name="lastname"
                                className="input"
                                placeholder="lastname"
                                value={input.lastname || ""}
                                onChange={handleChange}
                                >
                            </input>
                        </div>
                        <label>อีเมล</label>
                        <div className="Register-email-input">
                            <input 
                                required
                                type="text"
                                name="email"
                                className="input"
                                placeholder="email"
                                value={input.email || ""}
                                onChange={handleChange}
                                >
                            </input>
                        </div>
                        <label>รหัสผ่าน</label>
                        <div className="Register-password-input">
                            <input 
                                required
                                type="password"
                                name="password"
                                className="input"
                                placeholder="password"
                                value={input.password || ""}
                                onChange={handleChange}
                                >
                            </input>
                        </div>
                        <label>ยืนยันรหัสผ่าน</label>
                        <div className="Register-confirm-password-input">
                            <input 
                                required
                                type="password"
                                name="confirmpassword"
                                className="input"
                                placeholder="confirmpassword"
                                value={input.confirmpassword || ""}
                                onChange={handleChange}
                                >
                            </input>
                        </div>
                        <div className="Register-btn">
                        <button class="bubbly-button">SignUp</button>
                    </div>
                </form> 
            </div>           
        </div>
    )
}

export default Register;