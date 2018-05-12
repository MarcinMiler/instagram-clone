import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Spinner'
import UsersList from './UsersList'

const UsersListConainer = ({ searchUsers, navigation }) => {
    if (searchUsers.loading) return <Spinner />

    return <UsersList users={searchUsers.searchUsers} navigation={navigation} />
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
