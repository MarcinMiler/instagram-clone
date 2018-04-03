import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'
import { Container, P } from '../Styled'

import Navbar from '../Components/Navbar'

const UsersList = () => {
    const listOfUsers = [1, 2, 3, 4, 5, 6, 7].map(i => (
        <User key={i}>
            <UserPhoto width={45} source={require('../resources/andzia.jpg')} />
            <TextWrap>
                <Username>Username</Username>
                <Firstname>Firstname</Firstname>
            </TextWrap>
        </User>
    ))
    return (
        <Container>
            <Navbar back leftIcon="arrow-left" title="List of users" />
            <ScrollView>{listOfUsers}</ScrollView>
        </Container>
    )
}

export default UsersList

const User = styled.View`
    padding: 10px;
    flex-direction: row;
    width: 100%;
    height: 60;
`
const UserPhoto = styled.Image.attrs({
    width: props => props.width || 0
})`
    width: ${props => props.width}
    height: ${props => props.width}
    border-radius: ${props => props.width}
`
const TextWrap = styled.View`
    margin-left: 10;
    flex-direction: column;
    justify-content: space-around;
`
const Username = styled.Text`
    font-family: montserratMedium;
    font-size: 14;
`
const Firstname = styled.Text`
    font-family: montserratRegular;
    font-size: 12;
    color: gray;
`
