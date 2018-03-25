import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Container, P } from '../Styled'
import styled from 'styled-components'

const Notifications = () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(i => (
        <Item key={i}>
            <UserPhoto source={require('../resources/andzia.jpg')} />
            <P left size={14} marginLeft={15} style={{ flex: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Curabitur vel nisi convallis velit aliquet facilisis.
            </P>
        </Item>
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
    padding: 15px;
    align-items: center;
`
const UserPhoto = styled.Image`
    width: 50;
    height: 50;
    border-radius: 30;
`
