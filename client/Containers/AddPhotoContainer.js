import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import AddPhoto from '../Components/AddPhoto'

class AddPhotoContainer extends Component {
    addPhoto = () => {
        this.props.addPhoto({
            variables: {
                url: this.props.navigation.state.params.url
            }
        })
    }

    render() {
        return (
            <AddPhoto
                addPhoto={this.addPhoto}
                url={this.props.navigation.state.params.url}
            />
        )
    }
}

const addPhotoMutation = gql`
    mutation addPhoto($url: String!) {
        addPhoto(url: $url)
    }
`

export default graphql(addPhotoMutation, { name: 'addPhoto' })(
    AddPhotoContainer
)
