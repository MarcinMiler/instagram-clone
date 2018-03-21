import React, { Component } from 'react'
import { Dimensions, Image, ScrollView } from 'react-native'
import { Container, P, Flex } from '../Styled'
import styled from 'styled-components'

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FA from 'react-native-vector-icons/FontAwesome'

const { width, height } = Dimensions.get('window')

const Posts = () => {
    return [1, 2, 3, 4, 5, 6].map(img => {
        return (
            <React.Fragment key={img}>
                <Flex row padd="8px">
                    <UserPhoto source={require('../resources/andzia.jpg')} />
                    <P medium size={14} marginLeft={10}>
                        Angelaaa
                    </P>
                </Flex>
                <Image
                    style={{
                        width,
                        height: width
                    }}
                    source={require('../resources/andzia.jpg')}
                />
                <Flex padd="10px">
                    <Flex row>
                        <EvilIcons name="heart" size={36} color="black" />
                        <EvilIcons name="comment" size={36} color="black" />
                    </Flex>

                    <Flex row marginTop={5}>
                        <FA name="heart" size={14} color="black" />
                        <P medium size={16} marginLeft={7}>
                            500 likes
                        </P>
                    </Flex>

                    <Flex row marginTop={7}>
                        <P medium size={14}>
                            Angelaaa
                        </P>
                        <P size={14} marginLeft={5}>
                            Selfie
                        </P>
                    </Flex>
                    <Flex row marginTop={7}>
                        <P size={12} color="gray">
                            View all the comments 5
                        </P>
                    </Flex>
                </Flex>
            </React.Fragment>
        )
    })
}

const Feed = () => (
    <Container>
        <ScrollView>
            <Posts />
        </ScrollView>
    </Container>
)

export default Feed

const UserPhoto = styled.Image`
    width: 35;
    height: 35;
    border-radius: 30;
`
const Flex2 = styled.View`
    flex
`
