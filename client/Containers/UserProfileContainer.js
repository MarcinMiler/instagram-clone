import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import UserProfile from '../Components/UserProfile'

class UserProfileContainer extends Component {
    follow = id =>
        this.props.follow({
            variables: {
                followerId: id
            }
        })

    unfollow = id =>
        this.props.unfollow({
            variables: {
                followerId: id
            }
        })

    render() {
        const { user, isFollowing, navigation } = this.props
        if (user.loading || isFollowing.loading) return <Spinner />

        return (
            <UserProfile
                user={user.user}
                isFollowing={isFollowing.isFollowing}
                follow={this.follow}
                unfollow={this.unfollow}
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
const isFollowingQuery = gql`
    query isFollowing($userId: ID!) {
        isFollowing(userId: $userId)
    }
`
const followMutation = gql`
    mutation follow($followerId: ID!) {
        follow(followerId: $followerId)
    }
`
const unfollowMutation = gql`
    mutation unfollow($followerId: ID!) {
        unfollow(followerId: $followerId)
    }
`

export default compose(
    graphql(userQuery, {
        name: 'user',
        options: props => ({
            variables: {
                id: props.navigation.state.params.id
            }
        })
    }),
    graphql(isFollowingQuery, {
        name: 'isFollowing',
        options: props => ({
            variables: { userId: props.navigation.state.params.id }
        })
    }),
    graphql(followMutation, {
        name: 'follow',
        options: {
            refetchQueries: ['user', 'me', 'isFollowing']
        }
    }),
    graphql(unfollowMutation, {
        name: 'unfollow',
        options: {
            refetchQueries: ['user', 'me', 'isFollowing']
        }
    })
)(UserProfileContainer)
