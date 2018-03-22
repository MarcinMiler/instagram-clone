import React, { Component } from 'react'
import { Camera, Permissions } from 'expo'
import styled from 'styled-components'

class Cameraa extends Component {
    state = {
        cameraPermissions: null,
        type: Camera.Constants.Type.back
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ cameraPermissions: status === 'granted' })
    }

    render() {
        const { cameraPermissions, type } = this.state

        if (!cameraPermissions) return <Container />
        if (cameraPermissions === false) {
            return (
                <Container>
                    <P>No camera permissions</P>
                </Container>
            )
        }
        return (
            <Container>
                <Camera style={{ flex: 1 }} type={type} />
            </Container>
        )
    }
}

export default Cameraa

const Container = styled.View`
    flex: 1;
`
