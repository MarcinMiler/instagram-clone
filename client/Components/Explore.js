import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'
import { Container } from '../Styled'

import Icon from 'react-native-vector-icons/Feather'
import Photos from './Photos'
import BottomBar from './BottomBar'

const Explore = ({ photos, changeState, searchUser }) => (
    <Container>
        <Navbar>
            <Wrap>
                <Icon name="search" size={22} color="#000" />

                <Input
                    onChangeText={text => changeState('search', text)}
                    onSubmitEditing={() => searchUser()}
                    placeholder="Search"
                    placeholderTextColor="gray"
                    underlineColorAndroid="transparent"
                />
            </Wrap>
        </Navbar>

        <ScrollView>
            <Photos photos={photos} />
        </ScrollView>
        <BottomBar />
    </Container>
)

export default Explore

const Navbar = styled.View`
    width: 100%;
    height: 50;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 23px;
    border-bottom-width: 1;
    border-color: lightgray;
`
const Wrap = styled.View`
    flex-direction: row;
    align-items: center;
`
const Input = styled.TextInput`
    width: 95%;
    padding-left: 10px;
    border-bottom-width: 1;
    border-color: lightgray;
    font-family: 'montserratRegular';
    color: black;
`
