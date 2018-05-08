import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import Photo from '../Components/Photo'

class PhotoContainer extends Component {
    likePhoto = photoId =>
        this.props.likePhoto({
            variables: { photoId },
            update: (cache, { data: { likePhoto } }) => {
                if (likePhoto) {
                    let data = cache.readQuery({
                        query: photoQuery,
                        variables: {
                            photoId
                        }
                    })
                    data.photo.likesCount++
                    cache.writeQuery({
                        query: photoQuery,
                        variables: {
                            photoId
                        },
                        data
                    })
                }
            }
        })

    render() {
        if (this.props.photo.loading) return <Spinner />

        return (
            <Photo
                photo={this.props.photo.photo}
                isLiked={this.props.isLiked.isLiked}
                likePhoto={this.likePhoto}
                navigation={this.props.navigation}
            />
        )
    }
}

const photoQuery = gql`
    query photo($photoId: ID!) {
        photo(photoId: $photoId) {
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
const isLikedQuery = gql`
    query isLiked($photoId: ID!) {
        isLiked(photoId: $photoId)
    }
`
const likePhotoMutation = gql`
    mutation likePhoto($photoId: ID!) {
        likePhoto(photoId: $photoId)
    }
`

export default compose(
    graphql(photoQuery, {
        name: 'photo',
        options: props => ({
            variables: { photoId: props.navigation.state.params.id }
        })
    }),
    graphql(isLikedQuery, {
        name: 'isLiked',
        options: props => ({
            variables: { photoId: props.navigation.state.params.id }
        })
    }),
    graphql(likePhotoMutation, {
        name: 'likePhoto',
        options: {
            refetchQueries: ['isLiked']
        }
    })
)(PhotoContainer)
