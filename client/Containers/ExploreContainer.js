import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import Explore from '../Components/Explore'

class ExploreContainer extends Component {
    render() {
        if (this.props.photos.loading) return <Spinner />

        return <Explore photos={this.props.photos.photos} />
    }
}

const photosQuery = gql`
    query photos {
        photos {
            url
            id
        }
    }
`

export default graphql(photosQuery, { name: 'photos' })(ExploreContainer)
