import React, { Component } from 'react'

import Feed from '../Components/Feed'

class FeedContainer extends Component {
    render() {
        return <Feed navigation={this.props.navigation} />
    }
}

export default FeedContainer
