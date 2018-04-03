import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import UserProfile from '../Components/UserProfile'

class UserProfileContainer extends Component {
    render() {
        if (this.props.user.loading) return <Spinner />

        return (
            <UserProfile
                user={this.props.user.user}
                navigation={this.props.navigation}
            />
        )
    }
}

const userQuery = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            email
            fullname
            username
            bio
            date
            photos {
                id
                url
            }
            photosCount
            followingCount
            followersCount
        }
    }
`

export default graphql(userQuery, {
    name: 'user',
    options: props => ({
        variables: {
            id: props.navigation.state.params.id
        }
    })
})(UserProfileContainer)
