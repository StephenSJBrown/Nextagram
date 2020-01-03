import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback, FormGroup, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const LogInForm = ({ modal, toggle, isLoginForm, setIsLogInForm, text, setText, password, setPassword, setLoggedIn }) => {

    const history = useHistory()

    const handleInput = e => {
        setText(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const isDisabled = () => {
        return (text === '' || password === '' )
    }

    const logIn = () => {
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                username: text,
                password: password
            }
        })
            .then(response => {
                console.log(response)
                toast.success(`Welcome back, ${text}`, {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                toggle()
                localStorage.setItem('jwt', response.data.auth_token)
                setLoggedIn(true)
                history.push('/profile')
            })
            .catch(error => {
                console.error(`Error: ${error}`) // so that we know what went wrong if the request failed
                toast.error(`Something went wrong`, {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
            )
    }
    

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Log In</ModalHeader>
            <ModalBody>
                <form>
                    <Label>Username</Label>
                    <Input type="text" autoFocus onChange={handleInput} value={text} />
                    <FormFeedback></FormFeedback>
                    <Label>Password</Label>
                    <Input type="password" onChange={handlePassword} value={password} />
                    <FormFeedback></FormFeedback>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={logIn} disabled={isDisabled()}>Log In</Button>{' '}
                <Button color="link" onClick={() => setIsLogInForm(!isLoginForm)}>Sign Up</Button>
            </ModalFooter>
        </Modal>
    )
}

export default LogInForm