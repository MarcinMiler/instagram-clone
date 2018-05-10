import React, { Component } from 'react'
import { SecureStore } from 'expo'

import Spinner from '../Spinner'

class Loading extends Component {
    constructor(props) {
        super(props)
        this.bootstrapAsync()
    }

    bootstrapAsync = async () => {
        const userToken = await SecureStore.getItemAsync('token')
        this.props.navigation.navigate(userToken ? 'App' : 'Login')
    }

    render() {
        return <Spinner />
    }
}

export default Loading
