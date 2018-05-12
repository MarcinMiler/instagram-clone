import React, { Component } from 'react'
import { SecureStore } from 'expo'
import { Alert } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Login from './Login'

class LoginContainer extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    login = async () => {
        const { email, password } = this.state
        const valid = this.validateLogin(email, password)

        if (valid.ok) {
            const loginResponse = await this.props.login({
                variables: {
                    email,
                    password
                }
            })

            if (loginResponse.data.login.ok) {
                this.props.navigation.navigate('App')
                const { token } = loginResponse.data.login
                await SecureStore.setItemAsync('token', token)
            } else {
                Alert.alert(
                    'Register failed',
                    loginResponse.data.login.error.message,
                    [{ text: 'OK' }]
                )
            }
        }
    }

    validateLogin = (email, password) => {
        let messages = ''

        if (!email) messages += 'Email is empty, '
        else {
            const re = /\S+@\S+\.\S+/
            const emailTest = re.test(email)

            if (!emailTest) messages += 'Email is incorrect, '
        }

        if (!password) messages += 'Password is empty'

        if (messages) {
            Alert.alert('Login failed', messages, [{ text: 'OK' }])
            return { ok: false }
        }

        return { ok: true }
    }

    render() {
        return (
            <Login
                login={this.login}
                changeState={this.handleChangeState}
                navigation={this.props.navigation}
            />
        )
    }
}

const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ok
            token
        }
    }
`

export default graphql(loginMutation, { name: 'login' })(LoginContainer)
