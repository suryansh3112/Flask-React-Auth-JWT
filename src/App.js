import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserContext from './context/UserContext';
import {Home, Register, Login, PrivateRoute, Navbar} from './components'
import './App.css'
import axios from 'axios';
import jwt_decode from "jwt-decode";


function App() {

  const [timer,setTimer] = useState(null);

  const [userData,setUserData] = useState({
    auth:false,
    user:""
  })

  //Check if user is logged in after refresh
  useEffect(()=>{
    const func = async()=>{
      const token = localStorage.getItem('auth-token')
      //if token is present it verifies the token.
      if(token){
            try{
              const res = await axios.get('/verify_token',{ headers: { 'Authorization': 'Bearer '+token } })
              console.log(res.data);
              setUserData({
                auth:true,
                user:res.data.user
              })
            }catch(error){
              console.log("Token error found\n",error.response.data.msg);
            }
      }
      

    }

    func();
  },[])

  //Checks for token expiry . And after token expires, it logout the user. 
  useEffect(()=>{
    if(userData.auth){
      let interval = setInterval(() => {
        console.log("hi");
        const decoded = jwt_decode(localStorage.getItem('auth-token'))
          if(decoded.exp*1000 < Date.now()){
            alert('Your session has expired. Please Log in again')
            setUserData({
              auth:false,
              user:""
            })
            localStorage.removeItem('auth-token')
          }
        
      }, 5000);
      setTimer(interval)
    }else{
      clearInterval(timer);
    }
  },[userData.auth])

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar/>
          <div className='container'>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/private" component={PrivateRoute} />
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
     
    </>
  );
}

export default App;
