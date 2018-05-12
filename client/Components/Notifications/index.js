import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Spinner from '../Spinner'
import Notifications from './Notifications'

const NotificationsContainer = ({ notifications, navigation }) => {
    if (notifications.loading) return <Spinner />

    return (
        <Notifications
            notifications={notifications.notifications}
            navigation={navigation}
        />
    )
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
