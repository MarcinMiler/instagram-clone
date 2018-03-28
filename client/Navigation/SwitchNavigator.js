import { SwitchNavigator } from 'react-navigation'

import AppNavigator from './AppNavigator'
import LoginNavigator from './LoginNavigator'
import Loading from '../Components/Loading'

export default SwitchNavigator(
    {
        Loading: Loading,
        Login: LoginNavigator,
        App: AppNavigator
    },
    {
        initialRouteName: 'Loading'
    }
)
