import React from 'react'
import { ScrollView, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'

import Navbar from '../Components/Navbar'

const UsersList = ({ users, navigation }) => {
    const listOfUsers = users.map(user => (
        <TouchableWithoutFeedback
            key={user.id}
            onPress={() => navigation.navigate('UserProfile', { id: user.id })}
        >
            <User>
                <UserPhoto
                    width={45}
                    source={require('../resources/andzia.jpg')}
                />
                <TextWrap>
                    <Username>{user.username}</Username>
                    <Firstname>{user.fullname}</Firstname>
                </TextWrap>
            </User>
        </TouchableWithoutFeedback>
    ))
    return (
        <Container>
            <Navbar back leftIcon="arrow-left" title="List of users" />
            <ScrollView>{listOfUsers}</ScrollView>
        </Container>
    )
}

export default UsersList

const Container = styled.View`
    flex: 1;
    background-color: white;
`
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
