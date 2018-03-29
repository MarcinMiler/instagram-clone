import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import EditProfile from '../Components/EditProfile'

class EditProfileContainer extends Component {
    state = {
        fullname: '',
        username: '',
        bio: '',
        email: '',
        gender: 'Undefined'
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    render() {
        if (this.props.me.loading) return <Spinner />
        return (
            <EditProfile
                navigation={this.props.navigation}
                changeState={this.handleChangeState}
                state={this.state}
                me={this.props.me.me}
            />
        )
    }
}

const meQuery = gql`
    query me {
        me {
            fullname
            username
            email
            bio
        }
    }
`

export default graphql(meQuery, { name: 'me' })(EditProfileContainer)
