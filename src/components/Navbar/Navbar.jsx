import React,{useEffect,useState,useContext} from 'react'
import {Link, NavLink} from 'react-router-dom';
import {Button} from 'antd'
import UserContext from '../../context/UserContext';
import './navbar.css'

function Navbar() {

  const {userData,setUserData} = useContext(UserContext);

  const logout = ()=>{
    localStorage.removeItem("auth-token")
    setUserData({
      auth:false,
      user:undefined
    })
    console.log("Logout",userData,setUserData);
  }

  return (
    <div className='nav-container'>
      <nav>
        <div>
          <Link className='nav-item' to='/'>Home</Link>
        </div>
        <div className='right-nav'>
          <NavLink className='nav-item' activeClassName='active' to='/private'>Private Route</NavLink>
          {userData.auth ?
            <>
              <Button onClick={logout}>Logout</Button>
            </>
            :
            <>
              <NavLink className='nav-item' activeClassName='active' to='/login'>Login</NavLink>
              <NavLink className='nav-item' activeClassName='active' to='/register'>Register</NavLink>
            </> 
          }
          
        </div>
      </nav>
    </div>
  )
}

export default Navbar
