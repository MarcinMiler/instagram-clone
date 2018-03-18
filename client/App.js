import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'

import Home from './Components/Home'

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Home />
            </ApolloProvider>
        )
    }
}

export default App
