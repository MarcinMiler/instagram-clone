import React, { Component } from 'react'
import { Alert } from 'react-native'
import Login from '../Components/Login'

class LoginContainer extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    login = async () => {
        const { email, password } = this.state
        const valid = this.validateLogin(email, password)

        // if (valid.ok) {
        //     const loginResponse = await this.props.login({
        //         variables: {
        //             email,
        //             password
        //         }
        //     })

        //     if (loginResponse.data.login.ok) {
        //         const { token } = loginResponse.data.login
        //         this.props.setToken(token)
        //         await AsyncStorage.setItem('token', token)
        //     } else {
        //         let messages = ''
        //         loginResponse.data.login.error.message.forEach(
        //             msg => (messages += msg + '. ')
        //         )
        //         Alert.alert('Register failed', messages, [{ text: 'OK' }])
        //     }
        // }
    }

    validateLogin = (email, password) => {
        let messages = ''

        if (!email) messages += 'Email is empty, '
        else {
            let re = /\S+@\S+\.\S+/
            let emailTest = re.test(email)

            if (!emailTest) messages += 'Email is incorrect, '
        }

        if (!password) messages += 'Password is empty'

        if (messages.length > 0) {
            Alert.alert('Login failed', messages, [{ text: 'OK' }])
            return { ok: false }
        } else return { ok: true }
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

export default LoginContainer
