import React from 'react'
import { Container, P } from '../Styled'

const ProfileOptions = ({ navigation }) => (
    <Container>
        <P onPress={() => navigation.navigate('EditProfile')}>profileoptions</P>
    </Container>
)

export default ProfileOptions
