import React from 'react'
import { Image } from 'react-native'
import { Container } from '../Styled'

import Navbar from '../Components/Navbar'
import BottomBar from '../Components/BottomBar'
import Post from '../Components/Post'

const Photo = ({ photo, likePhoto, navigation }) => (
    <Container>
        <Navbar back leftIcon="arrow-left" title="Photo" />
        <Post photo={photo} likePhoto={likePhoto} navigation={navigation} />
        <BottomBar />
    </Container>
)

export default Photo
