import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'

const Spinner = () => (
    <Container>
        <ActivityIndicator size="large" color="#ff9068" />
    </Container>
)

export default Spinner

const Container = styled.View`
    flex: 1;
    justify-content: center;
`
