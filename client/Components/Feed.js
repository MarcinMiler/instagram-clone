import React from 'react'
import { ScrollView } from 'react-native'
import { Container } from '../Styled'

import Post from '../Components/Post'
import BottomBar from './BottomBar'
import Navbar from './Navbar'

const Feed = ({ feed, likePhoto, navigation }) => (
    <Container>
        <Navbar title="Instagram" />
        <ScrollView>
            {feed.map(photo => (
                <Post
                    key={photo.id}
                    photo={photo}
                    likePhoto={likePhoto}
                    navigation={navigation}
                />
            ))}
        </ScrollView>
        <BottomBar />
    </Container>
)

export default Feed
