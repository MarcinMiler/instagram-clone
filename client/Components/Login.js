import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import styled from 'styled-components'
import { LinearGradient } from 'expo'

const Login = ({ navigation, login, changeState }) => (
    <Container colors={['#AA00FF', '#CE31C4']}>
        <Wrap>
            <Title>Instagram</Title>
        </Wrap>

        <Wrap style={{ height: 230 }}>
            <SubTitle>Login</SubTitle>
            <Input
                onChangeText={text => changeState('email', text)}
                placeholder="Email"
                placeholderTextColor="lightgray"
                underlineColorAndroid="transparent"
            />
            <Input
                onChangeText={text => changeState('password', text)}
                placeholder="Password"
                placeholderTextColor="lightgray"
                underlineColorAndroid="transparent"
            />

            <TouchableNativeFeedback onPress={() => login()}>
                <Button>
                    <Text>Login</Text>
                </Button>
            </TouchableNativeFeedback>
        </Wrap>

        <Wrap>
            <TouchableNativeFeedback
                onPress={() => navigation.navigate('Register')}
            >
                <Button>
                    <Text>Register</Text>
                </Button>
            </TouchableNativeFeedback>
        </Wrap>
    </Container>
)

export default Login

const Container = styled(LinearGradient)`
    flex: 1;
    padding: 20px;
    padding-top: 23px;
    justify-content: space-between;
`
const Wrap = styled.View`
    justify-content: space-between;
`
const Text = styled.Text`
    font-family: montserratRegular;
    font-size: 18;
    text-align: center;
    color: white;
`
const Title = styled(Text)`
    margin-top: 20;
    font-size: 36;
`
const SubTitle = styled(Text)`
    font-size: 24;
`
const Input = styled.TextInput`
    padding: 4px;
    background-color: 'rgba(255,255,255,0.3)';
    font-family: 'montserratRegular';
    color: white;
    border-radius: 3;
`
const Button = styled.View`
    padding: 10px;
    background-color: transparent;
    border-width: 1;
    border-color: rgba(255, 255, 255, 0.35);
    border-radius: 3;
`
