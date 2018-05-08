import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import UsersList from '../Components/UsersList'

class UsersListConainer extends Component {
    render() {
        if (this.props.searchUsers.loading) return <Spinner />

        return (
            <UsersList
                users={this.props.searchUsers.searchUsers}
                navigation={this.props.navigation}
            />
        )
    }
}

const userSearchQuery = gql`
    query searchUsers($pattern: String) {
        searchUsers(pattern: $pattern) {
            id
            username
            fullname
        }
    }
`

export default graphql(userSearchQuery, {
    name: 'searchUsers',
    options: props => ({
        variables: {
            pattern: props.navigation.state.params.search
        }
    })
})(UsersListConainer)
