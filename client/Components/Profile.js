import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, P, Flex } from '../Styled'

import Icon from 'react-native-vector-icons/Ionicons'

const Profile = () => (
    <Container>
        <Header>
            <Photo />

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
                        <P color="#fff" size={16}>
                            Follow
                        </P>
                    </Button>
                </Flex>
            </Stats>
        </Header>

        <Description>
            <P left>Marcin Miler</P>
        </Description>

        <Icons row>
            <Icon name="ios-list-outline" size={34} color="gray" />
            <Icon name="ios-star-outline" size={24} color="gray" />
            <Icon name="ios-contacts-outline" size={24} color="gray" />
        </Icons>

        <Posts row>
            <Post />
            <Post />
            <Post />
            <Post />
        </Posts>
    </Container>
)

const Header = styled.View`
    flex-direction: row;
    height: 120;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
`
const Photo = styled.View`
    width: 80;
    height: 80;
    border-width: 1;
    border-color: black;
    border-radius: 50;
`
const Stats = styled.View`
    height: 120;
    margin-top: 20px;
    flex-direction: column;
    align-items: flex-start;
`
const Wrap = styled.View`
    flex-direction: column;
    padding: 8px;
`
const Button = styled.View`
    width: 100%;
    align-items: center;
    height: 25;
    background-color: #1795eb;
    border-radius: 5px;
`
const Description = styled.View`
    padding-left: 20px;
    padding-bottom: 10px;
`
const Icons = styled(Flex)`
    height: 40;
    justify-content: space-around;
    align-items: center;
    border-width: 1;
    border-color: lightgray;
`
const Posts = styled(Flex)`
    flex-wrap: wrap;
`
const Post = styled.View`
    width: 32.7%;
    padding-bottom: 33%;
    background-color: red;
    margin: 1px;
`

export default Profile
