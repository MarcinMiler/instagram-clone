import React, { Component } from 'react'
import { Container, P } from '../Styled'

import Photos from './Photos'
import { ScrollView } from 'react-native-gesture-handler'

const Explore = () => (
    <Container>
        <ScrollView>
            <Photos />
        </ScrollView>
    </Container>
)

export default Explore
