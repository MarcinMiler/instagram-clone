import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Profile from '../Components/Profile'

class ProfileContainer extends Component {
    render() {
        console.log(this.props)
        return <Profile />
    }
}

const usersQuery = gql`
    query users {
        users {
            id
        }
    }
`

export default graphql(usersQuery)(ProfileContainer)
