import styled from 'styled-components'
import { View, Text } from 'react-native'

export const Container = styled.View`
    flex: 1;
`
export const Flex = styled.View`
    width: 100%;
    flex-direction: ${props => (props.row ? 'row' : 'column')};
`
export const P = styled.Text.attrs({
    color: props => props.color || 'black',
    size: props => props.size || '18'
})`
    color: black;

    text-align: ${props => (props.left ? 'left' : 'center')};
    color: ${props => props.color};
    font-size: ${props => props.size}
    font-family: ${props =>
        props.medium ? 'montserratMedium' : 'montserratRegular'};
`
