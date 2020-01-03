import React, { useState } from 'react'
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'

const Ting = ({ modal, setModal, toggle, toast, setLoggedIn, loggedIn}) => {

  const [isLoginForm, setIsLogInForm] = useState(true)

  const [text, setText] = useState('')

  const [password, setPassword] = useState('')

  if (isLoginForm) {
    return (
      <>
        <LogInForm toggle={toggle} modal={modal} setModal={setModal} isLoginForm={isLoginForm} setIsLogInForm={setIsLogInForm} text={text} setText={setText} password={password} setPassword={setPassword} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      </>
    );
  } else {
    return (
      <>
        <SignUpForm toggle={toggle} modal={modal} setModal={setModal} isLoginForm={isLoginForm} setIsLogInForm={setIsLogInForm} text={text} setText={setText} password={password} setPassword={setPassword} toast={toast} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      </>
    );
  }

}

export default Ting
