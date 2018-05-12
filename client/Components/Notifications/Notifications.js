import React from 'react'
import { ScrollView, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components'

import Navbar from '../Navbar'
import BottomBar from '../BottomBar'

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
                <UserPhoto source={require('../../resources/andzia.jpg')} />
                <CommentText>
                    <Username>{notification.user.username}</Username>{' '}
                    {notification.message}
                </CommentText>
            </Item>
        </TouchableNativeFeedback>
    ))

    return (
        <Container>
            <Navbar title="Notifications" />
            <ScrollView>
                <Container>{list}</Container>
            </ScrollView>
            <BottomBar />
        </Container>
    )
}

export default Notifications

const Container = styled.View`
    flex: 1;
    background-color: white;
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
