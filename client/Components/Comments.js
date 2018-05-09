import React from 'react'
import {
    Dimensions,
    View,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'
import styled from 'styled-components'

import Navbar from '../Components/Navbar'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Foundation from 'react-native-vector-icons/Foundation'

const { height } = Dimensions.get('window')

const Comments = ({
    comments,
    addComment,
    likeComment,
    myId,
    changeState,
    state
}) => {
    const checkIfLiked = likes => likes.find(like => like.user.id === myId)

    const list = comments.map(comment => (
        <Comment key={comment.id}>
            <User>
                <UserPhoto
                    width={40}
                    source={require('../resources/andzia.jpg')}
                />
                <Content>
                    <Wrap>
                        <CommentText>
                            <Username>{comment.user.username}</Username>
                            {'  '}
                            {comment.text}
                        </CommentText>
                    </Wrap>
                    <CommentData>
                        <Text>5 minutes</Text>

                        <Text>{comment.likesCount} like</Text>

                        <Text>Replay</Text>
                    </CommentData>
                </Content>
            </User>
            <Like>
                {checkIfLiked(comment.likes) ? (
                    <Foundation name="heart" size={24} color="red" />
                ) : (
                    <EvilIcons
                        onPress={() => likeComment(comment.id)}
                        name="heart"
                        size={28}
                        color="lightgray"
                    />
                )}
            </Like>
        </Comment>
    ))
    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <Container>
                <Navbar back leftIcon="arrow-left" title="Comments" />
                <ScrollView style={{ height: height - 175 }}>{list}</ScrollView>
                <Input>
                    <UserPhoto
                        width={40}
                        source={require('../resources/andzia.jpg')}
                    />

                    <TextInput
                        value={state.text}
                        onChangeText={text => changeState('text', text)}
                        placeholder="Add comment..."
                        placeholderTextColor="lightgray"
                        underlineColorAndroid="transparent"
                        multiline
                    />

                    <Send onPress={() => addComment()}>Send</Send>
                </Input>
            </Container>
        </KeyboardAvoidingView>
    )
}

export default Comments

const Container = styled.View`
    flex: 1;
    background-color: white;
`
const Comment = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
`
const User = styled.View`
    flex-direction: row;
    flex-grow: 1;
`
const UserPhoto = styled.Image.attrs({
    width: props => props.width || 0
})`
    width: ${props => props.width}
    height: ${props => props.width}
    border-radius: ${props => props.width}
`
const Content = styled.View`
    width: 80%;
    justify-content: space-around;
    padding-left: 15px;
`
const Wrap = styled.View`
    flex-direction: row;
`
const CommentText = styled.Text`
    font-family: montserratRegular;
    font-size: 14;
`
const Username = styled.Text`
    font-family: montserratMedium;
    font-size: 14;
`
const CommentData = styled.View`
    flex-direction: row;
    width: 150;
    justify-content: space-between;
`
const Text = styled.Text`
    font-family: montserratRegular;
    font-size: 12;
    color: gray;
`
const Like = styled.View`
    width: 24;
    justify-content: center;
`
const Input = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    height: 80;
    border-top-width: 1;
    border-color: lightgray;
`
const TextInput = styled.TextInput`
    flex-grow: 1;
    max-width: 80%;
    height: 80;
    padding: 10px;
`
const Send = styled.Text`
    font-family: montserratRegular;
    font-size: 14;
`
