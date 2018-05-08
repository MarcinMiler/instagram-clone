import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import Feed from '../Components/Feed'

class FeedContainer extends Component {
    likePhoto = photoId =>
        this.props.likePhoto({
            variables: { photoId },
            update: (cache, { data: { likePhoto } }) => {
                if (likePhoto) {
                    let data = cache.readQuery({
                        query: feedQuery
                    })
                    data.feed.forEach(f => {
                        if (f.id === photoId) f.likesCount++
                    })
                    cache.writeQuery({
                        query: feedQuery,
                        data
                    })
                }
            }
        })

    render() {
        if (this.props.feed.loading) return <Spinner />

        return (
            <Feed
                feed={this.props.feed.feed}
                likePhoto={this.likePhoto}
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
const likePhotoMutation = gql`
    mutation likePhoto($photoId: ID!) {
        likePhoto(photoId: $photoId)
    }
`

export default compose(
    graphql(feedQuery, { name: 'feed' }),
    graphql(likePhotoMutation, { name: 'likePhoto' })
)(FeedContainer)
