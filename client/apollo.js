import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { SecureStore } from 'expo'

export const client = new ApolloClient({
    uri: 'http://192.168.8.101:4000/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: async operation => {
        const token = await SecureStore.getItemAsync('token')

        operation.setContext({
            headers: {
                token: token ? token : ''
            }
        })
    }
})
