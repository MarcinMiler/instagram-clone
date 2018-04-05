import React, { Component } from 'react'

import Photo from '../Components/Photo'

class PhotoContainer extends Component {
    render() {
        return <Photo navigation={this.props.navigation} />
    }
}

export default PhotoContainer
