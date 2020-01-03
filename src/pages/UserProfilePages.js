import React, { useEffect, useState } from "react"
import {
    useParams, Link
} from "react-router-dom";
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator'
import UserImages from '../containers/UserImages'
import styled from 'styled-components'
import {Button} from 'reactstrap'

const UserProfilePage = () => {
    let { id } = useParams();
    const [images, setImages] = useState([])
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [profilePhoto, setProfilePhoto] = useState('')

    const Page = styled.div`
    background-color: white;
    min-height: calc(100vh - 30px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    `;

    const AvatarBig = styled.img`
margin: 0 auto;
display: block;
height: 100px;
width: 100px;
border-radius: 50%;
`;

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
            .then(result => {
                setImages(result.data)
            })
            .catch(error => {
                console.log('ERROR ', error)
            })
    }, []
    )

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
            .then(result => {
                console.log(result.data.profileImage)
                setUsername(result.data.username)
                setIsLoading(false)
                setProfilePhoto(result.data.profileImage)
            })
            .catch(error => {
                setIsLoading(false)
                console.log('ERROR ', error)
            })
    }, []
    )

    return (
        <>
            <Page>
                <AvatarBig src={profilePhoto}></AvatarBig>
                <h1>{username}</h1>
                {isLoading
                    ? <LoadingIndicator></LoadingIndicator>
                    : images.length === 0
                        ? <><h1>Ain't got no pictures</h1>
                        <Link to='/'><Button>Back Home</Button></Link></>
                        : <UserImages images={images} />
                }
            </Page>
        </>
    )



};

export default UserProfilePage