import React, { Component } from 'react'
import { TabNavigator } from 'react-navigation'
import { View, Text } from 'react-native'

import FeedContainer from '../Containers/FeedContainer'
import CameraContainer from '../Containers/CameraContainer'
import ProfileContainer from '../Containers/ProfileContainer'
import ExploreContainer from '../Containers/ExploreContainer'
import NotificationsContainer from '../Containers/NotificationsContainer'

import FM from 'react-native-vector-icons/FontAwesome'
import MD from 'react-native-vector-icons/MaterialIcons'

const AppNavigation = TabNavigator(
    {
        Feed: {
            screen: FeedContainer,
            navigationOptions: {
                tabBarIcon: () => <FM name="home" size={20} color="black" />
            }
        },
        Explore: {
            screen: ExploreContainer,
            navigationOptions: {
                tabBarIcon: () => <FM name="search" size={20} color="black" />
            }
        },
        Camera: {
            screen: CameraContainer,
            navigationOptions: {
                tabBarIcon: () => (
                    <MD name="add-circle-outline" size={20} color="black" />
                )
            }
        },
        Nottifications: {
            screen: NotificationsContainer,
            navigationOptions: {
                tabBarIcon: () => <FM name="heart-o" size={20} color="black" />
            }
        },
        Profile: {
            screen: ProfileContainer,
            navigationOptions: {
                tabBarIcon: () => <FM name="user-o" size={20} color="black" />
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        lazy: false,
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
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
