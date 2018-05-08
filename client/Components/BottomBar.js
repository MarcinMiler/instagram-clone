import React from 'react'
import styled from 'styled-components'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

const BottomBar = ({ navigation }) => (
    <Container>
        <Icon
            onPress={() => navigation.navigate('Feed')}
            name="home"
            size={20}
            color="black"
        />
        <Icon
            onPress={() => navigation.navigate('Explore')}
            name="search"
            size={20}
            color="black"
        />
        <Icon
            onPress={() => navigation.navigate('Camera')}
            name="plus-circle"
            size={20}
            color="black"
        />
        <Icon
            onPress={() => navigation.navigate('Notifications')}
            name="heart"
            size={20}
            color="black"
        />
        <Icon
            onPress={() => navigation.navigate('Profile')}
            name="user"
            size={20}
            color="black"
        />
    </Container>
)

export default withNavigation(BottomBar)

const Container = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50;
    border-top-width: 1;
    border-color: lightgray;
`
