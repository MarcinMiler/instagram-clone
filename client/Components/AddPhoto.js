import React, { Component } from 'react'
import { Image, Dimensions, Button } from 'react-native'
import { Container } from '../Styled'
import styled from 'styled-components'

const { width, height } = Dimensions.get('window')

const AddPhoto = ({ addPhoto, url, changeState }) => {
    return (
        <Container>
            <Image
                source={{ uri: url }}
                style={{ width: width, height: width }}
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
}

export default AddPhoto

const Input = styled.TextInput`
    padding: 4px;
    padding-left: 10px;
    border-bottom-width: 1;
    border-color: lightgray;
    font-family: 'montserratRegular';
    color: black;
`
