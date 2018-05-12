import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'

import Icon from 'react-native-vector-icons/Feather'
import Navbar from '../Navbar'
import Photos from '../Photos'
import BottomBar from '../BottomBar'

const UserProfile = ({ user, isFollowing, follow, unfollow }) => (
    <Container>
        <Navbar back leftIcon="arrow-left" title={user.username} />
        <ScrollView>
            <Header>
                <UserPhoto
                    width={90}
                    source={require('../../resources/andzia.jpg')}
                />

                <Stats>
                    <Flex row>
                        <Wrap>
                            <Count>{user.photosCount}</Count>
                            <Text>posts</Text>
                        </Wrap>
                        <Wrap>
                            <Count>{user.followersCount}</Count>
                            <Text>followers</Text>
                        </Wrap>
                        <Wrap>
                            <Count>{user.followingCount}</Count>
                            <Text>following</Text>
                        </Wrap>
                    </Flex>

                    <Flex>
                        <Button>
                            {isFollowing ? (
                                <ButtonText onPress={() => unfollow(user.id)}>
                                    Unfollow
                                </ButtonText>
                            ) : (
                                <ButtonText onPress={() => follow(user.id)}>
                                    Follow
                                </ButtonText>
                            )}
                        </Button>
                    </Flex>
                </Stats>
            </Header>

            <Description>
                <Text>{user.fullname}</Text>
            </Description>

            <Icons row>
                <Icon name="list" size={20} color="gray" />
                <Icon name="star" size={20} color="gray" />
                <Icon name="users" size={20} color="gray" />
            </Icons>

            <Photos photos={user.photos} />
        </ScrollView>
        <BottomBar />
    </Container>
)

export default UserProfile

const Container = styled.View`
    flex: 1;
    background-color: white;
`
const Header = styled.View`
    flex-direction: row;
    height: 120;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
`
const UserPhoto = styled.Image.attrs({
    width: props => props.width || 0
})`
    width: ${props => props.width}
    height: ${props => props.width}
    border-radius: ${props => props.width}
`
const Stats = styled.View`
    height: 90;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
`
const Flex = styled.View`
    width: 100%;
    align-items: center;
    flex-direction: ${props => (props.row ? 'row' : 'column')};
`
const Wrap = styled.View`
    flex-direction: column;
    padding-left: 8px;
    padding-right: 8px;
`
const Count = styled.Text`
    font-family: montserratMedium;
    font-size: 20;
    text-align: center;
`
const Text = styled.Text`
    font-family: montserratMedium;
    font-size: 16;
    color: #9a9a9a;
`
const Button = styled.View`
    width: 100%;
    justify-content: center;
    height: 25;
    border-radius: 5px;
    border-width: 1;
    border-color: #c6c6c6;
`
const ButtonText = styled.Text`
    font-family: montserratRegular;
    font-size: 14;
    text-align: center;
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
