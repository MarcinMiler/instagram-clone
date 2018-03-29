import React, { Component } from 'react'

import ProfileOptions from '../Components/ProfileOptions'

class ProfileOptionsContainer extends Component {
    render() {
        return <ProfileOptions navigation={this.props.navigation} />
    }
}

export default ProfileOptionsContainer
