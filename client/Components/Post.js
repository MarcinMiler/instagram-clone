import React from 'react'
import { Dimensions, Image, TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Feather'

const { width, height } = Dimensions.get('window')

const Post = ({ photo, likePhoto, navigation }) => (
    <React.Fragment>
        <Header>
            <UserPhoto source={require('../resources/andzia.jpg')} />
            <Username>{photo.user.username}</Username>
        </Header>
        <TouchableNativeFeedback onPress={() => likePhoto(photo.id)}>
            <Image
                style={{
                    width,
                    height: width
                }}
                source={{ uri: photo.url }}
            />
        </TouchableNativeFeedback>
        <Footer>
            <Icons>
                <Icon name="heart" size={30} color="black" />
                <Icon name="message-circle" size={30} color="black" />
            </Icons>

            <LikeCount>
                <Icon name="heart" size={14} color="black" />
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
                            comments: photo.comments
                        })
                    }
                >
                    View all the comments {photo.commentsCount}
                </ViewComments>
            </Comment>
        </Footer>
    </React.Fragment>
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
`
const LikeCount = styled.View`
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
`
const LikeCountText = styled.Text`
    font-family: montserratMedium;
    font-size: 16;
    margin-left: 7;
`
const Icons = styled.View`
    flex-direction: row;
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
