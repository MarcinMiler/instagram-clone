import { SwitchNavigator } from 'react-navigation'

import AppNavigator from './AppNavigator'
import LoginNavigator from './LoginNavigator'

export default SwitchNavigator(
    {
        Login: LoginNavigator,
        App: AppNavigator
    },
    {
        initialRouteName: 'Login'
    }
)
