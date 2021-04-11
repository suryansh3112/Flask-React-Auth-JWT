import React,{useEffect,useState,useContext} from 'react'
import UserContext from '../../context/UserContext';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

function PrivateRoute() {
  
  const history = useHistory();

  const {userData, setUserData } = useContext(UserContext);
 
  const [info,setInfo] = useState({
    first_name:"",
    last_name:"",
    email:"",
    phone:""
  })

  useEffect(() => {
    const func = async()=>{
      const token = localStorage.getItem('auth-token')
      if(token){
        try {
          const res = await axios.get('/get_info',{ headers: { 'Authorization': 'Bearer '+token } })
          setInfo(res.data);
          console.log(res.data);
        } catch (error) {
          console.log("private route error => ",error.response.data.msg);
        }
      }
      
    }
    

    func();
    
  }, [])

  if(!userData.auth){
    return<div>
      <h1>To access this Page, Please Login!!</h1>
    </div>
  }

  return (
    
    <div>
      <h1>Your Personal Information</h1>
      {info && <ul>
        <li>{info.first_name}</li>
        <li>{info.last_name}</li>
        <li>{info.email}</li>
        <li>{info.phone}</li>
      </ul>}

      <h1>Some Hidden Information only for Logged in users</h1>
    </div>
  )
}

export default PrivateRoute
