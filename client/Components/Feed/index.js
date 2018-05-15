import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Permissions, Notifications } from 'expo'

import Spinner from '../Spinner'
import Feed from './Feed'

class FeedContainer extends Component {
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)

        const token = await Notifications.getExpoPushTokenAsync()

        console.log(token)
    }

    likePhoto = photoId =>
        this.props.likePhoto({
            variables: { photoId }
        })

    render() {
        if (this.props.feed.loading || this.props.me.loading) return <Spinner />

        return (
            <Feed
                feed={this.props.feed.feed}
                likePhoto={this.likePhoto}
                myId={this.props.me.me.id}
                navigation={this.props.navigation}
            />
        )
    }
}

const feedQuery = gql`
    query feed {
        feed {
            id
            url
            user {
                username
            }
            likes {
                user {
                    id
                    username
                }
            }
            likesCount
            comments {
                id
                text
                user {
                    id
                    username
                }
                likes {
                    user {
                        username
                    }
                }
                likesCount
            }
            commentsCount
        }
    }
`
const meQuery = gql`
    query me {
        me {
            id
        }
    }
`
const likePhotoMutation = gql`
    mutation likePhoto($photoId: ID!) {
        likePhoto(photoId: $photoId)
    }
`

export default compose(
    graphql(feedQuery, {
        name: 'feed',
        options: { fetchPolicy: 'network-only' }
    }),
    graphql(meQuery, { name: 'me' }),
    graphql(likePhotoMutation, {
        name: 'likePhoto',
        options: {
            refetchQueries: ['feed']
        }
    })
)(FeedContainer)
