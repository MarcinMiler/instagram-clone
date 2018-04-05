import React from 'react'
import { ScrollView } from 'react-native'
import { Container } from '../Styled'

import Post from '../Components/Post'

const Feed = ({ navigation }) => (
    <Container>
        <ScrollView>
            <Post navigation={navigation} />
        </ScrollView>
    </Container>
)

export default Feed
