import React, { Component } from 'react'
import { Image, Dimensions, Button } from 'react-native'
import styled from 'styled-components'
import Navbar from '../Navbar'

const { width, height } = Dimensions.get('window')

const AddPhoto = ({ addPhoto, url, changeState }) => (
    <Container>
        <Navbar back leftIcon="arrow-left" title="Add photo" />
        <Image
            source={{ uri: url }}
            style={{ width: width, height: width * (4 / 3) }}
        />

        <Input
            onChangeText={text => changeState('text', text)}
            placeholder="Description"
            placeholderTextColor="gray"
            underlineColorAndroid="transparent"
        />

        <Button title="Add photo" onPress={() => addPhoto()} />
    </Container>
)

export default AddPhoto

const Container = styled.View`
    flex: 1;
    background-color: white;
`
const Input = styled.TextInput`
    padding: 4px;
    padding-left: 10px;
    border-bottom-width: 1;
    border-color: lightgray;
    font-family: 'montserratRegular';
    color: black;
`
