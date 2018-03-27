import { StackNavigator } from 'react-navigation'

import LoginContainer from '../Containers/LoginContainer'
import RegisterContainer from '../Containers/RegisterContainer'

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
