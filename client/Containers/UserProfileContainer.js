import React, { Component } from 'react'

import UserProfile from '../Components/UserProfile'

class UserProfileContainer extends Component {
    render() {
        return <UserProfile navigation={this.props.navigation} />
    }
}

export default UserProfileContainer
