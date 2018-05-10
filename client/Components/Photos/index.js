import React from 'react'
import { Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import { withNavigation } from 'react-navigation'
import styled from 'styled-components'

const { width } = Dimensions.get('window')

const Photos = ({ photos, navigation }) => {
    const images = photos.map(photo => (
        <Post key={photo.id}>
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Photo', { id: photo.id })}
            >
                <Image
                    style={{
                        width: width / 3 - 2,
                        height: width / 3
                    }}
                    source={{ uri: photo.url }}
                />
            </TouchableWithoutFeedback>
        </Post>
    ))
    return <Posts>{images}</Posts>
}

export default withNavigation(Photos)

const Posts = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`
const Post = styled.View`
    margin: 1px;
    margin-top: 0px;
`
