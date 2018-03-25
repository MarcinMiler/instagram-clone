import React from 'react'
import { Dimensions, View, ScrollView } from 'react-native'
import { Container } from '../Styled'
import styled from 'styled-components'

import Icon from 'react-native-vector-icons/Feather'

const { width, height } = Dimensions.get('window')

const Comments = ({ changeState }) => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => {
        return (
            <Comment key={i}>
                <User>
                    <UserPhoto
                        width={40}
                        source={require('../resources/andzia.jpg')}
                    />
                    <Content>
                        <Wrap>
                            <CommentText>
                                <Username>Angelaaa</Username> You are beautiful
                                ❤
                            </CommentText>
                        </Wrap>
                        <CommentData>
                            <Text>5 minutes</Text>

                            <Text>1 like</Text>

                            <Text>Replay</Text>
                        </CommentData>
                    </Content>
                </User>
                <Like>
                    <Icon name="heart" size={18} color="lightgray" />
                </Like>
            </Comment>
        )
    })
    return (
        <Container>
            <ScrollView style={{ height: height - 175 }}>{list}</ScrollView>
            <Input>
                <UserPhoto
                    width={40}
                    source={require('../resources/andzia.jpg')}
                />

                <TextInput
                    onChangeText={text => changeState('text', text)}
                    placeholder="Add comment..."
                    placeholderTextColor="lightgray"
                    underlineColorAndroid="transparent"
                    multiline
                />

                <Send>Send</Send>
            </Input>
        </Container>
    )
}

export default Comments

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
    position: relative;
    bottom: 0;
    left: 0;
    border-top-width: 1;
    border-color: lightgray;
`
const TextInput = styled.TextInput`
    flex-grow: 1;
    max-width: 80%;
    height: 60;
    padding: 10px;
`
const Send = styled.Text`
    font-family: montserratRegular;
    font-size: 14;
`
