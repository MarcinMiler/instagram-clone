import React, { Component } from 'react'
import { Image, Dimensions, Button } from 'react-native'
import { Container } from '../Styled'
import styled from 'styled-components'

const { width, height } = Dimensions.get('window')

class AddPhoto extends Component {
    render() {
        return (
            <Container>
                <Image
                    source={{ uri: this.props.navigation.state.params.url }}
                    style={{ width: width, height: width }}
                />

                <Button title="Add photo" onPress={() => console.log('lol')} />
            </Container>
        )
    }
}

export default AddPhoto
