import React, { Component } from 'react'
import { Alert } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Register from './Register'

class RegisterContainer extends Component {
    state = {
        email: '',
        username: '',
        fullname: '',
        password: '',
        password2: ''
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    register = async () => {
        const { email, username, fullname, password, password2 } = this.state
        const valid = this.validateRegister(
            email,
            username,
            fullname,
            password,
            password2
        )

        if (valid.ok) {
            const registerResponse = await this.props.register({
                variables: {
                    email,
                    password,
                    username,
                    fullname
                }
            })
            if (!registerResponse.data.register.ok) {
                Alert.alert(
                    'Register failed',
                    registerResponse.data.register.error.message,
                    [{ text: 'OK' }]
                )
            }
            return true
        }
        return false
    }

    validateRegister = (email, username, fullname, password, password2) => {
        let messages = ''

        if (!email || !username || !fullname || !password || !password2) {
            messages += 'All fields must be filled, '
        }
        if (email) {
            const re = /\S+@\S+\.\S+/
            const emailTest = re.test(email)
            if (!emailTest) messages += 'Email is incorrect, '
        }

        if (password !== password2) messages += 'Passwords are not the same'

        if (messages) {
            Alert.alert('Login failed', messages, [{ text: 'OK' }])
            return { ok: false }
        }
        return { ok: true }
    }

    render() {
        return (
            <Register
                register={this.register}
                changeState={this.handleChangeState}
                navigation={this.props.navigation}
            />
        )
    }
}

const registerMutation = gql`
    mutation register(
        $email: String!
        $password: String!
        $username: String!
        $fullname: String!
    ) {
        register(
            email: $email
            password: $password
            username: $username
            fullname: $fullname
        ) {
            ok
            error
        }
    }
`

export default graphql(registerMutation, { name: 'register' })(
    RegisterContainer
)
