import React, { Component } from 'react'

import Register from '../Components/Register'

class RegisterContainer extends Component {
    state = {
        email: '',
        password: '',
        password2: ''
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    register = async () => {
        const { email, password, password2 } = this.state
        const valid = this.validateRegister(email, password, password2)

        // if (valid.ok) {
        //     const registerResponse = await this.props.register({
        //         variables: {
        //             email,
        //             password
        //         }
        //     })
        //     if (!registerResponse.data.register.ok) {
        //         let messages = ''
        //         registerResponse.data.register.error.message.forEach(
        //             msg => (messages += msg + '. ')
        //         )
        //         Alert.alert('Register failed', messages, [{ text: 'OK' }])
        //     }
        //     return true
        // }
        return false
    }

    validateRegister = (email, password, password2) => {
        let messages = ''

        if (!email) messages += 'Email is empty'
        else {
            let re = /\S+@\S+\.\S+/
            let emailTest = re.test(email)
            if (!emailTest) messages += 'Email is incorrect'
        }

        if (!password) messages += 'Password is empty'
        if (!password2) messages += 'Second Password is empty'
        if (password !== password2) messages += 'Passwords are not the same'

        if (messages.length > 0) {
            Alert.alert('Login failed', messages, [{ text: 'OK' }])
            return { ok: false }
        } else return { ok: true }
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

export default RegisterContainer
