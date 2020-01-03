import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import {
    Link, useHistory
} from "react-router-dom";
import axios from 'axios'

import Ting from './Modal'
import Upload from '../pages/Upload'


import { Button } from 'reactstrap'

const NavBar = ({ toast, setLoggedIn, loggedIn }) => {

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const [uploadModal, setUploadModal] = useState(false)
    const uploadToggle = () => setUploadModal(!uploadModal)

    const history = useHistory()

    const logOut = () => {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
        history.push('/')
        toast.success(`You've been logged out`, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    // let { id } = useParams();
    const [profileImage, setProfileImage] = useState('')

    useEffect(() => {
        // temporarily use 1
        axios.get(`https://insta.nextacademy.com/api/v1/users/1`)
            .then(result => {
                setProfileImage(result.data.profileImage)
            })

            .catch(error => {
                console.log('ERROR ', error)
            })
    }, []
    )

    const NavBar = styled.header`
    width: 100vw;
        height: 30px;
        background-color: wheat;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        color: palevioletred;
        padding: 30px;
        `;

        const RightNav = styled.div`
        width: 18vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        `

    const Avatar = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin: 10px;
    `;

    return (
        <NavBar>
            <Link to="/">Home</Link>
            {loggedIn
                ? <>
                    <RightNav>
                        <Link to="/profile">My Profile
                            <Avatar src={profileImage} />
                        </Link>
                        <Button color="danger" onClick={uploadToggle}>Upload</Button>
                        <Button color="danger" onClick={logOut}>Log Out</Button>
                    </RightNav>
                </>
                : <Button color="danger" onClick={toggle}>LogIn</Button>
            }
            <Ting toggle={toggle} modal={modal} setModal={setModal} toast={toast} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
            <Upload uploadModal={uploadModal} setUploadModal={setUploadModal} uploadToggle={uploadToggle} ></Upload>
        </NavBar>
    )

}

export default NavBar