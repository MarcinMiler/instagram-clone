import React, { Component } from 'react'
import { ScrollView, Image, Dimensions } from 'react-native'
import styled from 'styled-components'
import { Container, P, Flex } from '../Styled'

import Icon from 'react-native-vector-icons/Ionicons'

const Profile = () => {
    const { width, height } = Dimensions.get('window')

    const images = [1, 2, 3, 4, 5, 6, 7].map(i => (
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
    return (
        <Container>
            <ScrollView>
                <Header>
                    <Photo source={require('../resources/andzia.jpg')} />

                    <Stats>
                        <Flex row>
                            <Wrap>
                                <P medium>0</P>
                                <P color="#9A9A9A">posts</P>
                            </Wrap>
                            <Wrap>
                                <P medium>0</P>
                                <P color="#9A9A9A">followers</P>
                            </Wrap>
                            <Wrap>
                                <P medium>0</P>
                                <P color="#9A9A9A">following</P>
                            </Wrap>
                        </Flex>

                        <Flex>
                            <Button>
                                <P color="#000" size={14}>
                                    Edit profile
                                </P>
                            </Button>
                        </Flex>
                    </Stats>
                </Header>

                <Description>
                    <P left size={15} medium>
                        Angelika Miler
                    </P>
                </Description>

                <Icons row>
                    <Icon name="ios-list-outline" size={34} color="gray" />
                    <Icon name="ios-star-outline" size={24} color="gray" />
                    <Icon name="ios-contacts-outline" size={24} color="gray" />
                </Icons>

                <Posts row>{images}</Posts>
            </ScrollView>
        </Container>
    )
}

const Header = styled.View`
    flex-direction: row;
    height: 120;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
`
const Photo = styled.Image`
    width: 90;
    height: 90;
    border-radius: 50;
`
const Stats = styled.View`
    height: 90;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
`
const Wrap = styled.View`
    flex-direction: column;
    padding-left: 8px;
    padding-right: 8px;
`
const Button = styled.View`
    width: 100%;
    justify-content: center;
    height: 25;
    border-radius: 5px;
    border-width: 1;
    border-color: #c6c6c6;
`
const Description = styled.View`
    padding: 10px;
`
const Icons = styled(Flex)`
    height: 50;
    justify-content: space-around;
    align-items: center;
    border-width: 1;
    border-color: lightgray;
    border-bottom-width: 0;
`
const Posts = styled(Flex)`
    flex-wrap: wrap;
`
const Post = styled.View`
    margin: 1px;
    margin-top: 0px;
`

export default Profile
