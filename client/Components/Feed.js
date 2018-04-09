import React from 'react'
import { ScrollView } from 'react-native'
import { Container } from '../Styled'

import Post from '../Components/Post'

const Feed = ({ feed, likePhoto, navigation }) => (
    <Container>
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
    </Container>
)

export default Feed
