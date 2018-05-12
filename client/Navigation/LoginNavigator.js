import { StackNavigator } from 'react-navigation'

import LoginContainer from '../Components/Login'
import RegisterContainer from '../Components/Register'

export default StackNavigator(
    {
        Login: {
            screen: LoginContainer
        },
        Register: {
            screen: RegisterContainer
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
)
