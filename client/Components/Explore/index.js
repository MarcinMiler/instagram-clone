import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Spinner'
import Explore from './Explore'

class ExploreContainer extends Component {
    state = {
        search: ''
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    searchUser = () =>
        this.props.navigation.navigate('UsersList', {
            search: this.state.search
        })

    render() {
        if (this.props.photos.loading) return <Spinner />

        return (
            <Explore
                photos={this.props.photos.photos}
                changeState={this.handleChangeState}
                searchUser={this.searchUser}
            />
        )
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
