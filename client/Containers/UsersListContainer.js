import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import UsersList from '../Components/UsersList'

class UsersListConainer extends Component {
    render() {
        if (this.props.searchUser.loading) return <Spinner />

        return (
            <UsersList
                users={this.props.searchUser.searchUser}
                navigation={this.props.navigation}
            />
        )
    }
}

const userSearchQuery = gql`
    query searchUser($pattern: String) {
        searchUser(pattern: $pattern) {
            id
            username
            fullname
        }
    }
`

export default graphql(userSearchQuery, {
    name: 'searchUser',
    options: props => ({
        variables: {
            pattern: props.navigation.state.params.search
        }
    })
})(UsersListConainer)
