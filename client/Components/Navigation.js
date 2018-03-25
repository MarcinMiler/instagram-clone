import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { View, Text, TextInput } from 'react-native'

import FeedContainer from '../Containers/FeedContainer'
import CameraContainer from '../Containers/CameraContainer'
import ProfileContainer from '../Containers/ProfileContainer'
import ExploreContainer from '../Containers/ExploreContainer'
import NotificationsContainer from '../Containers/NotificationsContainer'

import Icon from 'react-native-vector-icons/Feather'
import CommentsContainer from '../Containers/CommentsContainer'

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
            title: 'Instagram'
        }
    }
)

const ExploreNavigation = StackNavigator(
    {
        Main: {
            screen: ExploreContainer
        }
    },
    {
        navigationOptions: {
            title: 'Search'
        }
    }
)

const ProfileNavigation = StackNavigator(
    {
        Main: {
            screen: ProfileContainer
        }
    },
    {
        navigationOptions: {
            title: 'Profile'
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

const AppNavigation = TabNavigator(
    {
        Feed: {
            screen: FeedNavigation,
            navigationOptions: {
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Icon name="home" size={20} color="black" />
                    ) : (
                        <Icon name="home" size={20} color="#C6C6C6" />
                    )
            }
        },
        Explore: {
            screen: ExploreNavigation,
            navigationOptions: {
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Icon name="search" size={20} color="black" />
                    ) : (
                        <Icon name="search" size={20} color="#C6C6C6" />
                    )
            }
        },
        Camera: {
            screen: CameraContainer,
            navigationOptions: {
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Icon name="plus-circle" size={20} color="black" />
                    ) : (
                        <Icon name="plus-circle" size={20} color="#C6C6C6" />
                    )
            }
        },
        Notifications: {
            screen: NotificationsNavigation,
            navigationOptions: {
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Icon name="heart" size={20} color="black" />
                    ) : (
                        <Icon name="heart" size={20} color="#C6C6C6" />
                    )
            }
        },
        Profile: {
            screen: ProfileNavigation,
            navigationOptions: {
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Icon name="user" size={20} color="black" />
                    ) : (
                        <Icon name="user" size={20} color="#C6C6C6" />
                    )
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        initialRouteName: 'Profile',
        lazy: true,
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: '#000000',
            indicatorStyle: {
                display: 'none'
            },
            style: {
                backgroundColor: 'white'
            }
        }
    }
)

export default AppNavigation
