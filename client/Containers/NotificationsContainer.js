import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Components/Spinner'
import Notifications from '../Components/Notifications'

class NotificationsContainer extends Component {
    render() {
        if (this.props.notifications.loading) return <Spinner />

        return (
            <Notifications
                notifications={this.props.notifications.notifications}
                navigation={this.props.navigation}
            />
        )
    }
}

const notificationsQuery = gql`
    query notifications {
        notifications {
            id
            message
            userId
            photoId
            user {
                username
            }
        }
    }
`

export default graphql(notificationsQuery, { name: 'notifications' })(
    NotificationsContainer
)
