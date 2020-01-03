import React from 'react';
import styled from 'styled-components'

const LoadingIndicator = () => {

const LoadContainer = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`

const Loader = styled.img`

`

    return (
        <LoadContainer>
        < Loader src='../Spinner.gif' alt='loader' />
        </LoadContainer>
    )
}


export default LoadingIndicator