import React, { useState, useEffect } from 'react';
import '../App.css';
import styled from 'styled-components';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator'
import {Link} from 'react-router-dom'



const Home = () => {
    const Page = styled.div`
    background-color: #ffe9e9;
    min-height: 100vh;
    `;
  
    const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    `;
  
    const Main = styled.section`
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    `
  
    const Avatar = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 50px;
    margin-right: 10px;
  `;
  
    const User = styled.div`
    height: 60px;
    width: 21vw;
    margin: 10px 20px;
  `;
  
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      // performing a GET request
      axios.get('https://insta.nextacademy.com/api/v1/users')
        .then(result => {
          // If successful, we do stuffs with 'result'
        //   console.log(result.data)
          setUsers(result.data)
          setIsLoading(false)
        })
        .catch(error => {
          // If unsuccessful, we notify users what went wrong
          console.log('ERROR: ', error)
        })
    }, [])

    
    // LoadingIndicator(isLoading)
    

    return (
      <>
        <Page>
          <Header><h1>Home Page</h1></Header>
          {isLoading
          ? <LoadingIndicator></LoadingIndicator>
          : <Main> 
            {users.map(user => (
              <User key={user.id} >
                <Avatar src={user.profileImage} />
                <Link to={`/users/${user.id}`}>
                {user.username}
                </Link>
              </User>
            ))}
          </Main>}
        </Page>
      </>
    );
}

export default Home;