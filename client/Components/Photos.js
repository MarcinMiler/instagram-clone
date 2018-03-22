import React from 'react'
import { Dimensions, Image } from 'react-native'
import styled from 'styled-components'
import { Flex } from '../Styled'

const { width } = Dimensions.get('window')

const Photos = () => {
    const images = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17
    ].map(i => (
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
    return <Posts row>{images}</Posts>
}

export default Photos

const Posts = styled(Flex)`
    flex-wrap: wrap;
`
const Post = styled.View`
    margin: 1px;
    margin-top: 0px;
`
