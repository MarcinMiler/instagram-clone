import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'

import Post from '../Post'
import BottomBar from '../BottomBar'
import Navbar from '../Navbar'

const Feed = ({ feed, likePhoto, myId, navigation }) => (
    <Container>
        <Navbar title="Instagram" />
        <ScrollView>
            {feed.map(photo => (
                <Post
                    key={photo.id}
                    photo={photo}
                    likePhoto={likePhoto}
                    myId={myId}
                    navigation={navigation}
                />
            ))}
        </ScrollView>
        <BottomBar />
    </Container>
)

export default Feed

const Container = styled.View`
    flex: 1;
    background-color: white;
`
