import React, { Component } from 'react'
import { Image, Dimensions, Button } from 'react-native'
import { Container } from '../Styled'
import styled from 'styled-components'

const { width, height } = Dimensions.get('window')

const AddPhoto = ({ addPhoto, url }) => {
    return (
        <Container>
            <Image
                source={{ uri: url }}
                style={{ width: width, height: width }}
            />

            <Button title="Add photo" onPress={() => addPhoto()} />
        </Container>
    )
}

export default AddPhoto
