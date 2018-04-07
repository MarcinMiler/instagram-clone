import React from 'react'
import { Dimensions, Image } from 'react-native'
import { Container } from '../Styled'

import Navbar from '../Components/Navbar'
import Post from '../Components/Post'

const { width, height } = Dimensions.get('window')

const Photo = ({ photo, likePhoto, navigation }) => (
    <Container>
        <Navbar back leftIcon="arrow-left" title="Photo" />
        <Post photo={photo} likePhoto={likePhoto} navigation={navigation} />
    </Container>
)

export default Photo
