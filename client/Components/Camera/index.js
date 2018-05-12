import React, { Component } from 'react'
import { Dimensions, Text } from 'react-native'
import { Camera, Permissions } from 'expo'
import styled from 'styled-components'

import Icon from 'react-native-vector-icons/Feather'
import BottomBar from '../BottomBar'

const { width } = Dimensions.get('window')

class Cameraa extends Component {
    state = {
        cameraPermissions: null,
        type: Camera.Constants.Type.back,
        flash: Camera.Constants.FlashMode.off
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        await Permissions.askAsync(Permissions.CAMERA_ROLL)
        this.setState({ cameraPermissions: status === 'granted' })
    }

    takePicture = async () => {
        if (this.camera) {
            const photo = await this.camera.takePictureAsync()
            this.props.navigation.navigate('AddPhoto', { url: photo.uri })
        }
    }

    rotateCamera = () =>
        this.setState(state => ({
            type:
                state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        }))

    switchFlash = () =>
        this.setState(state => ({
            flash:
                state.flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
        }))

    render() {
        const { cameraPermissions } = this.state
        if (!cameraPermissions) return <Container />
        if (cameraPermissions === false) {
            return (
                <Container>
                    <Text>No camera permissions</Text>
                </Container>
            )
        }
        return (
            <Container>
                <Camera
                    style={{
                        width,
                        height: width * (4 / 3)
                    }}
                    ref={ref => (this.camera = ref)}
                    type={this.state.type}
                    flashMode={this.state.flash}
                >
                    <Icons>
                        <Icon
                            name="refresh-ccw"
                            size={26}
                            color="white"
                            onPress={() => this.rotateCamera()}
                        />
                        <Icon
                            name="zap"
                            size={26}
                            color="white"
                            onPress={() => this.switchFlash()}
                        />
                    </Icons>
                </Camera>

                <Wrap>
                    <Icon
                        name="circle"
                        size={86}
                        color="lightgray"
                        onPress={() => this.takePicture()}
                    />
                </Wrap>
                <BottomBar />
            </Container>
        )
    }
}

export default Cameraa

const Container = styled.View`
    flex: 1;
`
const Icons = styled.View`
    flex: 1;
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
`
const Wrap = styled.View`
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`
