import React,{useState, useEffect} from 'react'
import './BMI.css'

const BMI = () => {
    const [heigth, setHeigth] = useState(0);
    const [weigth, setWeigth] = useState(0);
    const [BMIPic, setBMIPic] = useState('/images/BMI02.png');
    const convertHeigth = heigth/100;
    const [total, setTotal] = useState(weigth/(convertHeigth*convertHeigth));

    const changeBMI = (number) => {
        if(number === 0){
            setBMIPic('/images/BMI01.png');
        }
        else{
            setBMIPic('/images/BMI02.png');
        }
    }

    useEffect(() => {

        const interval = setInterval(() => {
            const bmi = weigth/(convertHeigth*convertHeigth);
            setTotal(bmi);
            const convert = Number((bmi).toFixed(1));
            setTotal(convert);

        },1000);

        return () => clearInterval(interval);
    },[weigth,convertHeigth])

  return (
    <div className='BMI'>
    <img src={BMIPic} alt='BMI'/>
        <div className='type'>
            <img className='male'src='/images/male.png' onClick={() => changeBMI(0)}/>
            <img className='female'src='/images/female.png' onClick={() => changeBMI(1)}/>
        </div>

        
        <div className='calculateBMI'>
            <p>Heigth</p>
            <input type='number' 
            placeholder='0' 
            value={heigth}
            onChange={e => setHeigth(e.target.value)}
            />
            <p>Weigth</p>
            <input type='number' 
            placeholder='0' 
            value={weigth}
            onChange={e => setWeigth(e.target.value)}
            />
            <p>BMI</p>
            <input type='number' 
            placeholder='0' 
            value={total}
            onChange={e => setTotal(e.target.value)}
            disabled
            />
        </div>
    </div>
  )
}

export default BMI