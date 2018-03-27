import React, { Component } from 'react'

import Register from '../Components/Register'

class RegisterContainer extends Component {
    render() {
        return <Register navigation={this.props.navigation} />
    }
}

export default RegisterContainer
