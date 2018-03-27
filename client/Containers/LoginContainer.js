import React, { Component } from 'react'

import Login from '../Components/Login'

class LoginContainer extends Component {
    render() {
        return <Login navigation={this.props.navigation} />
    }
}

export default LoginContainer
