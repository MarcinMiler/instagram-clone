import { StackNavigator } from 'react-navigation'

import LoginContainer from '../Containers/LoginContainer'

export default StackNavigator(
    {
        Main: {
            screen: LoginContainer
        }
    },
    {
        navigationOptions: {
            header: null
        }
    }
)
