import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, CardText, CardDeck, CardColumns } from 'reactstrap';

const UserImages = ({ images }) => {

    const UserImage = styled.img`
    object-fit: cover;
    border: 1px black;
    background-color: white;
    height: 300px;
    width: 94%;
    margin: 13px auto;
    display: block;
    `;

    const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100vw;
    height: auto;
    padding: 5vh 10vw;
    min-height: 100%;
    `;

    return (

        <Container>
            <CardColumns>
                {images.map((photo, index) => {
                    return (
                        <Card>
                            <UserImage src={photo} key={index} alt={index} />
                            <CardBody>
                                <CardText><small></small></CardText>
                            </CardBody>
                        </Card>
                    )
                })}
            </CardColumns>
        </Container>
    )
}

export default UserImages
