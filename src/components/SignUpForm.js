import React, { useState } from "react"
import { useHistory } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { toast } from 'react-toastify'

const SignUpForm = ({ modal, toggle, isLoginForm, setIsLogInForm, text, setText, password, setPassword, setLoggedIn, loggedIn }) => {
    // 1. Code out your Log In and Sign Up as Controlled Form

    // Login form should contain username and password field.

    // Signup form should contain username, email, password and confirm password field

    // When either form is submitted, console.log the provided username, email and password, then close the modal.

    // 2. Form validation

    // Disable the submit button when one of the fields is empty

    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleDelay = (e, callback) => {
        let x = { ...e };
        let newDelay = setTimeout(() => handleInput(x), 300);
        callback(e.target.value);
        setDelay(newDelay);
    };

    const handleInput = e => {
        setText(e.target.value)
        if (e.target.value.length >= 6) {
            axios
                .get(
                    `https://insta.nextacademy.com/api/v1/users/check_name?username=${e.target.value}`
                )
                .then(response => {
                    if (response.data.valid) {
                        setUsernameValid(true);
                    } else {
                        setUsernameValid(false);
                    }
                });
        }
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleVerifyPassword = (e) => {
        setVerifyPassword(e.target.value)
    }

    const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    const emailIsInvalid = () => {
        return (
            !(emailRegex.test(email)))
    }

    const passwordIsInvalid = () => {
        if (password.length && password.length < 8) {
            return 'Password must be at least 8 characters'
        } else {
            return false
        }
    }

    const verifyPasswordIsInvalid = () => {
        if (verifyPassword.length && verifyPassword === password) {
            return true
        } else {
            return false
        }
    }

    const isDisabled = () => {
        return (text === '' || email === '' || password === '' || verifyPassword === '')
    }

    const signUp = () => {
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: text,
                email: email,
                password: password
            }
        })
            .then(response => {
                console.log(response)
                toast.success(`Welcome to Nextagram, ${text}`, {
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
                useHistory.push('/profile')
            })
            .catch(error => {
                console.error(error.response) // so that we know what went wrong if the request failed
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
        <>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input type="text"
                            value={text}
                            autoFocus
                            onChange={e => {
                                if (delay) {
                                    clearTimeout(delay);
                                }
                                handleDelay(e, setText);
                            }}
                            {...(text.length >= 6
                                ? usernameValid
                                    ? { valid: true }
                                    : { invalid: true }
                                : text.length > 0
                                    ? { invalid: true }
                                    : "")} />
                        <FormFeedback
                            {...(text.length > 0 && text.length >= 6
                                ? usernameValid
                                    ? { valid: true }
                                    : { invalid: true }
                                : { invalid: true })}
                        >
                            {text.length >= 6
                                ? usernameValid
                                    ? "Sweet, this username is available!"
                                    : "Sorry, this username is taken!"
                                : "Must be minimum 6 characters"}
                        </FormFeedback>
                        <Label>Email</Label>
                        <Input type="email"
                            value={email}
                            autoFocus
                            {...(email.length > 5
                                ? emailIsInvalid()
                                    ? { invalid: true }
                                    : { valid: true }
                                : { invalid: null })
                            }
                            onChange={handleEmail}
                        />
                        <FormFeedback
                            {...(email.length > 5
                                ? emailIsInvalid()
                                    ? { invalid: true }
                                    : { valid: true }
                                : { invalid: null })
                            }
                        >
                            {email
                                ? emailIsInvalid()
                                    ? "Emails should contain @ and none of that other fancy stuff"
                                    : "That's a solid email, friend"
                                : ""}
                        </FormFeedback>
                        <Label>Password</Label>
                        <Input type="password" value={password} onChange={handlePassword}
                            {
                            ...password.length > 0
                                ? passwordIsInvalid()
                                    ? { invalid: true }
                                    : { valid: true }
                                : { invalid: null }
                            }
                        />
                        <FormFeedback {...passwordIsInvalid()
                            ? { invalid: true }
                            : { valid: true }}>
                            {passwordIsInvalid() ? passwordIsInvalid() : ''}
                        </FormFeedback>
                        <Label>Retype Password</Label>
                        <Input type="password" value={verifyPassword} onChange={handleVerifyPassword}
                            {
                            ...(verifyPassword.length > 8
                                ? verifyPasswordIsInvalid()
                                    ? { valid: true }
                                    : { invalid: true }
                                : { invalid: null })
                            } />
                        <FormFeedback
                            {...(verifyPassword.length > 8
                                ? verifyPasswordIsInvalid()
                                    ? { valid: true }
                                    : { invalid: true }
                                : { valid: null })}

                        >
                            {verifyPassword.length > 8
                                ? verifyPasswordIsInvalid()
                                    ? "Great, looks good"
                                    : "This doesn't match your original password"
                                : ""}
                        </FormFeedback>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    Already a member?
                        <Button color="link" onClick={() => setIsLogInForm(!isLoginForm)}>Log In</Button>
                    <Button color="primary" disabled={isDisabled()} onClick={signUp} >Sign Up</Button>{' '}

                </ModalFooter>
            </Modal>
        </>
    )
}

export default SignUpForm

