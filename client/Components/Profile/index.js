import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Spinner'
import Profile from './Profile'

class ProfileContainer extends Component {
    handleChangeState = (key, value) => this.setState({ [key]: value })

    render() {
        if (this.props.me.loading) return <Spinner />
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
    options: { fetchPolicy: 'network-only' }
})(ProfileContainer)
