import styled from 'styled-components'
import { View, Text } from 'react-native'

export const Container = styled.View`
    flex: 1;
    background-color: white;
`
export const Flex = styled.View.attrs({
    padd: props => props.padd || '0px',
    marginTop: props => props.marginTop || 0
})`
    width: 100%;
    align-items: center;
    margin-top: ${props => props.marginTop};
    padding: ${props => props.padd};
    flex-direction: ${props => (props.row ? 'row' : 'column')};
`
export const P = styled.Text.attrs({
    color: props => props.color || 'black',
    size: props => props.size || '18',
    marginLeft: props => props.marginLeft || 0,
    marginTop: props => props.marginTop || 0
})`
    color: black;

    margin-left: ${props => props.marginLeft};
    margin-top: ${props => props.marginTop};
    text-align: ${props => (props.left ? 'left' : 'center')};
    color: ${props => props.color};
    font-size: ${props => props.size}
    font-family: ${props =>
        props.medium ? 'montserratMedium' : 'montserratRegular'};
`
