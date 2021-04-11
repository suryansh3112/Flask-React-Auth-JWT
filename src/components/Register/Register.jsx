import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import Error from '../Errors/Errors';

function Register() {
  
  const history = useHistory();
  const [error, setError] = useState('');

  const [info,setInfo] = useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    phone:"",
  })

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setInfo(prev=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }


  const submit = async (e) => {
    console.log(info);
    const {first_name, last_name, email, password, phone} = info

    if(!first_name || !last_name || !email || !password || !phone){
      setError("Please fill every thing")
      return;
    }

    if(phone.length!==10){
      setError("Please enter 10 digit phone number");
      return; 
    }
    
   

    try {
      const res = await axios.post('/register',info)
      alert('Registered Successfully.')
      history.push('/login');
      console.log(res.data.message);

    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const clearError = () => setError(undefined);

  

  return(
    <div className='reg-container'>
      {error && <Error message={error} clearError={clearError} />}
      <h1>Register</h1>
      <div className='name'>
        <Input placeholder='First Name' className='inp' name='first_name' value={info.first_name} onChange={handleChange}/>
        <Input placeholder='Last Name' className='inp' name='last_name'  value={info.last_name} onChange={handleChange}/>
      </div>
      
      <Input type='email' placeholder='Email' className='inp' name='email'  value={info.email} onChange={handleChange}/>
      <Input type='number' placeholder='Phone' className='inp' name='phone'  value={info.phone} onChange={handleChange}/>
      <Input.Password placeholder='Password' className='inp' name='password'  value={info.password} onChange={handleChange}/>
      <Button type="primary" className='reg-btn' onClick={submit}>Register</Button>
    </div>
  )
}

export default Register;
