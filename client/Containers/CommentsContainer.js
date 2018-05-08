import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import Comments from '../Components/Comments'

class CommentsContainer extends Component {
    state = {
        text: ''
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    addComment = async () => {
        this.props.addComment({
            variables: {
                photoId: this.props.navigation.state.params.id,
                text: this.state.text
            }
        })
        this.setState({ text: '' })
    }

    likeComment = commentId =>
        this.props.likeComment({
            variables: { commentId }
        })

    render() {
        if (this.props.photo.loading) return <Spinner />

        return (
            <Comments
                comments={this.props.photo.photo.comments}
                addComment={this.addComment}
                likeComment={this.likeComment}
                myId={this.props.me.me.id}
                state={this.state}
                changeState={this.handleChangeState}
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
                        id
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
const addCommentMutation = gql`
    mutation addComment($photoId: ID!, $text: String!) {
        addComment(photoId: $photoId, text: $text)
    }
`
const likeCommentMutation = gql`
    mutation likeComment($commentId: ID!) {
        likeComment(commentId: $commentId)
    }
`

export default compose(
    graphql(photoQuery, {
        name: 'photo',
        options: props => ({
            variables: { photoId: props.navigation.state.params.id }
        })
    }),
    graphql(meQuery, { name: 'me', options: { fetchPolicy: 'cache-only' } }),
    graphql(addCommentMutation, {
        name: 'addComment',
        options: {
            refetchQueries: ['photo']
        }
    }),
    graphql(likeCommentMutation, {
        name: 'likeComment',
        options: {
            refetchQueries: ['photo']
        }
    })
)(CommentsContainer)
