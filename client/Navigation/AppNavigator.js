import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { View, Text, TextInput } from 'react-native'

import FeedContainer from '../Containers/FeedContainer'
import Camera from '../Components/Camera'
import ProfileContainer from '../Containers/ProfileContainer'
import ExploreContainer from '../Containers/ExploreContainer'
import NotificationsContainer from '../Containers/NotificationsContainer'
import CommentsContainer from '../Containers/CommentsContainer'
import ProfileOptionsContainer from '../Containers/ProfileOptionsContainer'
import EditProfileContainer from '../Containers/EditProfileContainer'
import AddPhotoContainer from '../Containers/AddPhotoContainer'
import UsersListContainer from '../Containers/UsersListContainer'
import UserProfileContainer from '../Containers/UserProfileContainer'
import PhotoContainer from '../Containers/PhotoContainer'

import Icon from 'react-native-vector-icons/Feather'

const FeedNavigation = StackNavigator(
    {
        Main: {
            screen: FeedContainer
        },
        Comments: {
            screen: CommentsContainer,
            navigationOptions: {
                tabBarVisible: false,
                swipeEnabled: false
            }
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
)

const ExploreNavigation = StackNavigator(
    {
        Main: {
            screen: ExploreContainer
        },
        UsersList: {
            screen: UsersListContainer
        },
        UserProfile: {
            screen: UserProfileContainer
        },
        Photo: {
            screen: PhotoContainer
        },
        Comments: {
            screen: CommentsContainer,
            navigationOptions: {
                tabBarVisible: false,
                swipeEnabled: false
            }
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
)

const CameraNavigation = StackNavigator({
    Main: {
        screen: Camera,
        navigationOptions: {
            header: null
        }
    },
    AddPhoto: {
        screen: AddPhotoContainer,
        navigationOptions: {
            header: null
        }
    }
})

const ProfileNavigation = StackNavigator(
    {
        Main: {
            screen: ProfileContainer
        },
        ProfileOptions: {
            screen: ProfileOptionsContainer
        },
        EditProfile: {
            screen: EditProfileContainer
        },
        Photo: {
            screen: PhotoContainer
        },
        Comments: {
            screen: CommentsContainer,
            navigationOptions: {
                tabBarVisible: false,
                swipeEnabled: false
            }
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
)

const NotificationsNavigation = StackNavigator(
    {
        Main: {
            screen: NotificationsContainer
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
)

export default StackNavigator(
    {
        Feed: {
            screen: FeedNavigation
        },
        Explore: {
            screen: ExploreNavigation
        },
        Camera: {
            screen: CameraNavigation
        },
        Notifications: {
            screen: NotificationsNavigation
        },
        Profile: {
            screen: ProfileNavigation
        }
    },
    {
        headerMode: null
    }
)
