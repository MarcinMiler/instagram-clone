import React from 'react'
import {
    Dimensions,
    Image,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native'
import styled from 'styled-components'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Foundation from 'react-native-vector-icons/Foundation'

const { width, height } = Dimensions.get('window')

const checkIfLiked = (likes, myId) => likes.find(like => like.user.id === myId)

const Post = ({ photo, likePhoto, myId, navigation }) => (
    <ScrollView>
        <Header>
            <UserPhoto source={require('../resources/andzia.jpg')} />
            <Username>{photo.user.username}</Username>
        </Header>
        <TouchableNativeFeedback onPress={() => likePhoto(photo.id)}>
            <Image
                style={{
                    width,
                    height: width * (4 / 3)
                }}
                source={{ uri: photo.url }}
            />
        </TouchableNativeFeedback>
        <Footer>
            <Icons>
                {checkIfLiked(photo.likes, myId) ? (
                    <Foundation name="heart" size={32} color="red" />
                ) : (
                    <EvilIcons name="heart" size={40} color="black" />
                )}

                <EvilIcons
                    onPress={() =>
                        navigation.navigate('Comments', {
                            id: photo.id
                        })
                    }
                    name="comment"
                    size={40}
                    color="black"
                />
            </Icons>

            <LikeCount>
                <LikeCountText>{photo.likesCount} likes</LikeCountText>
            </LikeCount>

            <Comment>
                <Username>{photo.comments[0].user.username}</Username>
                <CommentText>{photo.comments[0].text}</CommentText>
            </Comment>

            <Comment>
                <ViewComments
                    onPress={() =>
                        navigation.navigate('Comments', {
                            id: photo.id
                        })
                    }
                >
                    View all the comments {photo.commentsCount}
                </ViewComments>
            </Comment>
        </Footer>
    </ScrollView>
)

export default Post

const Header = styled.View`
    flex-direction: row;
    padding: 8px;
    align-items: center;
`
const UserPhoto = styled.Image`
    width: 35;
    height: 35;
    border-radius: 30;
    margin-right: 10px;
`
const Username = styled.Text`
    font-family: montserratMedium;
    font-size: 14;
`
const Footer = styled.View`
    padding: 10px;
    padding-left: 15px;
`
const LikeCount = styled.View`
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
`
const LikeCountText = styled.Text`
    font-family: montserratMedium;
    font-size: 16;
`
const Icons = styled.View`
    flex-direction: row;
    margin-left: -6px;
`
const Comment = styled.View`
    flex-direction: row;
    margin-top: 7;
    align-items: center;
`
const CommentText = styled.Text`
    font-family: montserratRegular;
    font-size: 14;
    margin-left: 5;
`
const ViewComments = styled.Text`
    font-family: montserratRegular;
    font-size: 12;
    color: gray;
`
