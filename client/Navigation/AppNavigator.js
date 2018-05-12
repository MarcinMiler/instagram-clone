import { StackNavigator } from 'react-navigation'

import Feed from '../Components/Feed'
import Camera from '../Components/Camera'
import Profile from '../Components/Profile'
import Explore from '../Components/Explore'
import Notifications from '../Components/Notifications'
import Comments from '../Components/Comments'
import ProfileOptions from '../Components/ProfileOptions'
import EditProfile from '../Components/EditProfile'
import AddPhoto from '../Components/AddPhoto'
import UsersList from '../Components/UsersList'
import UserProfile from '../Components/UserProfile'
import Photo from '../Components/Photo'

const FeedNavigation = StackNavigator(
    {
        Main: {
            screen: Feed
        },
        Comments: {
            screen: Comments
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
            screen: Explore
        },
        UsersList: {
            screen: UsersList
        },
        UserProfile: {
            screen: UserProfile
        },
        Photo: {
            screen: Photo
        },
        Comments: {
            screen: Comments
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
)

const CameraNavigation = StackNavigator(
    {
        Main: {
            screen: Camera
        },
        AddPhoto: {
            screen: AddPhoto
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
)

const ProfileNavigation = StackNavigator(
    {
        Main: {
            screen: Profile
        },
        ProfileOptions: {
            screen: ProfileOptions
        },
        EditProfile: {
            screen: EditProfile
        },
        Photo: {
            screen: Photo
        },
        Comments: {
            screen: Comments
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
            screen: Notifications
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
