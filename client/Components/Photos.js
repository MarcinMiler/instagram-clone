import React from 'react'
import { Dimensions, Image } from 'react-native'
import styled from 'styled-components'
import { Flex } from '../Styled'

const { width } = Dimensions.get('window')

const Photos = ({ photos }) => {
    const images = photos.map(i => (
        <Post key={i}>
            <Image
                style={{
                    width: width / 3 - 2,
                    height: width / 3
                }}
                source={require('../resources/andzia.jpg')}
            />
        </Post>
    ))
    return <Posts row />
}

export default Photos

const Posts = styled(Flex)`
    flex-wrap: wrap;
`
const Post = styled.View`
    margin: 1px;
    margin-top: 0px;
`
