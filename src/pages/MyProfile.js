import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import UserImages from '../containers/UserImages'

const MyProfile = () => {

    const [images, setImages] = useState([])
    const [profileImg, setProfileImg] = useState('')

    const [isLoading, setIsLoading] = useState(true)

    const jwt = localStorage.getItem('jwt')

    const [username, setUsername] = useState('')

    const AvatarBig = styled.img`
    margin: 0 auto;
    display: block;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    `;


    useEffect(() => {
        Axios.get('https://insta.nextacademy.com/api/v1/users/me',
            { headers: { 'Authorization': `Bearer ${jwt}` } }
        )
            .then(response => {
                setIsLoading(false)
                setUsername(response.data.username)
                setProfileImg(response.data.profile_picture)
            })
            .catch(error => {
                setIsLoading(false)
                console.log('Error', error)
                toast.error(`Something went wrong`, {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
    }, []
    )

    useEffect(() => {
        Axios.get('https://insta.nextacademy.com/api/v1/images/me',
            { headers: { 'Authorization': `Bearer ${jwt}` } }
        )
            .then(response => {
                setIsLoading(false)
                console.log(response.data)
                setImages(response.data)
            })
            .catch(error => {
                setIsLoading(false)
                console.log('Error', error)
                toast.error(`Something went wrong`, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                })
            })
    }, [jwt]
    )

    return (
        <>
            {
                isLoading
                    ? <> <LoadingIndicator /> <h3>Dusting off your pictures</h3> </>
                    : (images.length === 0)
                        ? <>
                            <AvatarBig src={profileImg} />
                            <h1>{username}</h1>
                            <h3>You ain't got no pictures yet </h3>
                        </>
                        : <>
                            <AvatarBig src={profileImg} />
                            <h1>{username}</h1>
                            <UserImages images={images} />
                        </>
            }
        </>
    )
}

export default MyProfile