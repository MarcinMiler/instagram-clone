import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Profile from '../Components/Profile'

class ProfileContainer extends Component {
    state = {
        switch: 'MyPhotos'
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    render() {
        return (
            <Profile changeState={this.handleChangeState} state={this.state} />
        )
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
