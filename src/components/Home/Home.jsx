import React,{useEffect,useState,useContext} from 'react'
import UserContext from '../../context/UserContext';

function Home() {
  const {userData, setUserData } = useContext(UserContext);

  return (
    <div>
      {userData.auth ? 
        <h1>Welcome {userData.user}</h1>
        :
        <h1>Welcome to the Home Page. You are currently not logged in.</h1>
      }
    </div>
  )
}

export default Home
