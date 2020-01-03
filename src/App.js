import React, {useState } from 'react';
import './App.css';
import Home from './pages/Home';
import {
  Route
} from "react-router-dom";
import UserProfilePage from './pages/UserProfilePages'
import NavBar from './components/NavBar'
import MyProfile from './pages/MyProfile'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )

  return (
    <>
      <ToastContainer />
      <NavBar toast={toast} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Route exact path="/" component={Home} />
      <Route path="/users/:id" component={UserProfilePage} />
      <Route path="/profile" component={MyProfile} />
    </>
  )

}

export default App;
