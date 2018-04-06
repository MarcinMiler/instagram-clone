import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import Photo from '../Components/Photo'

class PhotoContainer extends Component {
    render() {
        if (this.props.photo.loading) return <Spinner />

        return (
            <Photo
                photo={this.props.photo.photo}
                navigation={this.props.navigation}
            />
        )
    }
}

const photoQuery = gql`
    query photo($photoId: ID!) {
        photo(photoId: $photoId) {
            id
            date
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
                text
            }
            commentsCount
        }
    }
`

export default graphql(photoQuery, {
    name: 'photo',
    options: props => ({
        variables: { photoId: props.navigation.state.params.id }
    })
})(PhotoContainer)
