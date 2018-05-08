import React, { Component } from 'react'
import { ScrollView, TouchableNativeFeedback } from 'react-native'
import { Container, P } from '../Styled'
import styled from 'styled-components'
import BottomBar from './BottomBar'

const Notifications = ({ notifications, navigation }) => {
    const list = notifications.map(notification => (
        <TouchableNativeFeedback
            onPress={() =>
                notification.photoId
                    ? navigation.navigate('Photo', { id: notification.photoId })
                    : navigation.navigate('UserProfile', {
                          id: notification.userId
                      })
            }
            key={notification.id}
        >
            <Item>
                <UserPhoto source={require('../resources/andzia.jpg')} />
                <CommentText>
                    <Username>{notification.user.username}</Username>{' '}
                    {notification.message}
                </CommentText>
            </Item>
        </TouchableNativeFeedback>
    ))

    return (
        <Container>
            <Nav>
                <NavItem>
                    <P>Followers</P>
                </NavItem>
                <NavItem>
                    <P medium>You</P>
                </NavItem>
            </Nav>
            <ScrollView>
                <Container>{list}</Container>
            </ScrollView>
            <BottomBar />
        </Container>
    )
}

export default Notifications

const Nav = styled.View`
    flex-direction: row;
    margin-top: 23;
    border-bottom-width: 1;
    border-color: lightgray;
`
const NavItem = styled.View`
    width: 50%;
    padding: 15px;
`
const Item = styled.View`
    width: 100%;
    flex-direction: row;
    padding: 10px;
    align-items: center;
`
const UserPhoto = styled.Image`
    width: 50;
    height: 50;
    border-radius: 30;
`
const Username = styled.Text`
    font-family: montserratMedium;
    font-size: 14;
`
const CommentText = styled.Text`
    flex: 1;
    margin-left: 10;
    font-family: montserratRegular;
    font-size: 14;
`
