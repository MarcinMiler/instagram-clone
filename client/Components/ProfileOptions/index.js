import React, { Component } from 'react'
import { SecureStore } from 'expo'
import ProfileOptions from './ProfileOptions'

class ProfileOptionsContainer extends Component {
    logout = () => {
        SecureStore.deleteItemAsync('token')
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <ProfileOptions
                navigation={this.props.navigation}
                logout={this.logout}
            />
        )
    }
}

export default ProfileOptionsContainer
