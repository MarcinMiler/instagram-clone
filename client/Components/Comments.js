import React from 'react'
import { Dimensions, View } from 'react-native'
import { P, Container } from '../Styled'
import styled from 'styled-components'

import EvilIcons from 'react-native-vector-icons/EvilIcons'

const { width, height } = Dimensions.get('window')

const Comments = () => {
    const list = [1, 2, 3, 4, 5, 6].map(i => {
        return (
            <Flex row key={i} style={{ padding: 15 }}>
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
            {list}
            <Input>
                <Photo width={40} source={require('../resources/andzia.jpg')} />
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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60;
    background-color: blue;
    position: absolute;
    bottom: 0;
    left: 0;
`
