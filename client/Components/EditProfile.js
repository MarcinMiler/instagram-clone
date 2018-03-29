import React from 'react'
import { Picker } from 'react-native'
import styled from 'styled-components'
import { Container, P } from '../Styled'
import Navbar from './Navbar'

const EditProfile = ({ navigation, changeState, state, me }) => (
    <Container>
        <Navbar
            back
            leftIcon="arrow-left"
            title="Edit profile"
            navigation={navigation}
            rightIcon="check"
            rightIconColor="lightgreen"
        />
        <WrapPhoto>
            <UserPhoto width={90} source={require('../resources/andzia.jpg')} />
            <ColorText>Change photo</ColorText>
        </WrapPhoto>

        <Wrap>
            <Input
                value={me.fullname}
                onChangeText={text => changeState('fullname', text)}
                placeholder="Full name"
                placeholderTextColor="gray"
                underlineColorAndroid="transparent"
            />

            <Input
                value={me.username}
                onChangeText={text => changeState('username', text)}
                placeholder="User name"
                placeholderTextColor="gray"
                underlineColorAndroid="transparent"
            />
            <Input
                value={me.bio}
                onChangeText={text => changeState('bio', text)}
                placeholder="Bio"
                multiline
                placeholderTextColor="gray"
                underlineColorAndroid="transparent"
            />

            <Title>Private informations</Title>

            <Input
                value={me.email}
                onChangeText={text => changeState('email', text)}
                placeholder="Email"
                multiline
                placeholderTextColor="gray"
                underlineColorAndroid="transparent"
            />
        </Wrap>
    </Container>
)

export default EditProfile

const UserPhoto = styled.Image.attrs({
    width: props => props.width || 0
})`
    width: ${props => props.width}
    height: ${props => props.width}
    border-radius: ${props => props.width}
`
const WrapPhoto = styled.View`
    margin-top: 10;
    height: 130;
    justify-content: space-around;
    align-items: center;
`
const Wrap = styled.View`
    padding: 15px;
`
const ColorText = styled.Text`
    font-family: montserratRegular;
    font-size: 18;
    color: #4286f4;
`
const Input = styled.TextInput`
    margin-bottom: 15px;
    padding: 4px;
    padding-left: 10px;
    border-bottom-width: 1;
    border-color: lightgray;
    font-family: 'montserratRegular';
`
const Title = styled.Text`
    margin-top: 10;
    margin-bottom: 10;
    font-family: montserratMedium;
    font-size: 18;
`
