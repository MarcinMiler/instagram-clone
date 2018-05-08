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
                            photoId: this.props.navigation.state.params.id
                        }
                    })
                    data.photo.likesCount++
                    cache.writeQuery({
                        query: photoQuery,
                        variables: {
                            photoId: this.props.navigation.state.params.id
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
    graphql(likePhotoMutation, { name: 'likePhoto' })
)(PhotoContainer)
