import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import Profile from '../Components/Profile'

class ProfileContainer extends Component {
    state = {
        switch: 'MyPhotos'
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    render() {
        if (this.props.me.loading) return <Spinner />
        console.log('im rerendered ;>')
        return (
            <Profile
                me={this.props.me.me}
                changeState={this.handleChangeState}
                state={this.state}
                navigation={this.props.navigation}
            />
        )
    }
}

const meQuery = gql`
    query me {
        me {
            id
            email
            fullname
            username
            bio
            photos {
                url
                id
            }
            photosCount
            followingCount
            followersCount
        }
    }
`

export default graphql(meQuery, {
    name: 'me',
    options: {
        pollInterval: 60000
    }
})(ProfileContainer)
