import React from 'react'
import {
    Dimensions,
    View,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import { P, Container } from '../Styled'
import styled from 'styled-components'

import EvilIcons from 'react-native-vector-icons/EvilIcons'

const { width, height } = Dimensions.get('window')

const Comments = ({ changeState }) => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => {
        return (
            <Flex row key={i} style={{ padding: 10 }}>
                <Flex row style={{ flexGrow: 1 }}>
                    <Photo
                        width={40}
                        source={require('../resources/andzia.jpg')}
                    />
                    <Flex
                        style={{
                            paddingLeft: 10,
                            justifyContent: 'space-around',
                            width: '80%'
                        }}
                    >
                        <Flex row>
                            <P size={14} left>
                                <P medium size={14}>
                                    Angelaaa
                                </P>{' '}
                                You are beautiful ❤
                            </P>
                        </Flex>
                        <Flex row>
                            <P size={12} color="gray">
                                5 minutes
                            </P>

                            <P size={12} color="gray" marginLeft={35}>
                                1 like
                            </P>

                            <P size={12} color="gray" marginLeft={35}>
                                Replay
                            </P>
                        </Flex>
                    </Flex>
                </Flex>
                <View
                    style={{
                        justifyContent: 'center',
                        width: 24
                    }}
                >
                    <EvilIcons name="heart" size={24} color="gray" />
                </View>
            </Flex>
        )
    })
    return (
        <Container>
            <ScrollView style={{ height: height - 175 }}>{list}</ScrollView>
            <Input>
                <Photo width={40} source={require('../resources/andzia.jpg')} />

                <TextInput
                    onChangeText={text => changeState('text', text)}
                    placeholder="Add comment..."
                    placeholderTextColor="lightgray"
                    underlineColorAndroid="transparent"
                    multiline
                />

                <P size={14}>Send</P>
            </Input>
        </Container>
    )
}

export default Comments

const Photo = styled.Image.attrs({
    width: props => props.width || 0
})`
    width: ${props => props.width}
    height: ${props => props.width}
    border-radius: ${props => props.width}
`
const Flex = styled.View`
    flex-direction: ${props => (props.row ? 'row' : 'column')};
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
