import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import { SecureStore } from 'expo'
import styled from 'styled-components'

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
        return (
            <Container>
                <ActivityIndicator size="large" color="#ff9068" />
            </Container>
        )
    }
}

export default Loading

const Container = styled.View`
    flex: 1;
    justify-content: center;
`
