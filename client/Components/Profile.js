import React, { Component } from 'react'
import { ScrollView, Image, View } from 'react-native'
import styled from 'styled-components'
import { Container, P, Flex } from '../Styled'

import Icon from 'react-native-vector-icons/Feather'
import Photos from './Photos'

const Profile = () => {
    return (
        <Container>
            <ScrollView>
                <Header>
                    <Photo source={require('../resources/andzia.jpg')} />

                    <Stats>
                        <Flex row>
                            <Wrap>
                                <P medium size={20}>
                                    20
                                </P>
                                <P color="#9A9A9A">postss</P>
                            </Wrap>
                            <Wrap>
                                <P medium size={20}>
                                    50
                                </P>
                                <P color="#9A9A9A">followers</P>
                            </Wrap>
                            <Wrap>
                                <P medium size={20}>
                                    1000
                                </P>
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
                    <Icon name="list" size={20} color="gray" />
                    <Icon name="star" size={20} color="gray" />
                    <Icon name="users" size={20} color="gray" />
                </Icons>

                <Photos />
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

export default Profile
