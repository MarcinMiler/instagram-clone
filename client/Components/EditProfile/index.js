import React, { Component } from 'react'
import { Alert } from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Spinner'
import EditProfile from './EditProfile'

class EditProfileContainer extends Component {
    state = {
        fullname: '',
        username: '',
        bio: '',
        email: ''
    }

    handleChangeState = (key, value) => this.setState({ [key]: value })

    changeProfileDetails = async () => {
        const { fullname, username, bio, email } = this.state

        if (fullname || username || bio || email) {
            const res = await this.props.changeProfileDetails({
                variables: {
                    fullname,
                    username,
                    bio,
                    email
                }
            })

            if (res.data.changeProfileDetails.error) {
                Alert.alert('Error', res.data.changeProfileDetails.error, [
                    { text: 'OK' }
                ])
            } else {
                Alert.alert('Succesfull', 'New data is saved', [{ text: 'OK' }])
            }
        } else {
            Alert.alert('Error', 'No fields to change', [{ text: 'OK' }])
        }
        this.setState({ fullname: '', username: '', bio: '', email: '' })
    }

    render() {
        if (this.props.me.loading) return <Spinner />

        return (
            <EditProfile
                changeProfileDetails={this.changeProfileDetails}
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
const changeProfileDetails = gql`
    mutation changeProfileDetails(
        $fullname: String
        $username: String
        $bio: String
        $email: String
    ) {
        changeProfileDetails(
            fullname: $fullname
            username: $username
            bio: $bio
            email: $email
        )
    }
`

export default compose(
    graphql(meQuery, { name: 'me' }),
    graphql(changeProfileDetails, { name: 'changeProfileDetails' })
)(EditProfileContainer)
