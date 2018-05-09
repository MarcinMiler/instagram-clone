import React from 'react'
import { NavigationActions, withNavigation } from 'react-navigation'
import styled from 'styled-components'

import Icon from 'react-native-vector-icons/Feather'

const Navbar = ({
    leftIcon,
    leftAction,
    rightIcon,
    rightAction,
    rightIconColor,
    title,
    back,
    navigation
}) => (
    <Container>
        {leftIcon && (
            <Left>
                <Icon
                    onPress={() =>
                        back
                            ? navigation.dispatch(NavigationActions.back())
                            : leftAction()
                    }
                    name={leftIcon}
                    size={24}
                    color="#000"
                />
            </Left>
        )}
        <Middle>
            <Text>{title}</Text>
        </Middle>

        {rightIcon && (
            <Right>
                <Icon
                    onPress={() => rightAction()}
                    name={rightIcon}
                    size={24}
                    color={rightIconColor ? rightIconColor : '#000'}
                />
            </Right>
        )}
    </Container>
)

export default withNavigation(Navbar)

const Container = styled.View`
    width: 100%;
    height: 50;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 23px;
    border-bottom-width: 1;
    border-color: lightgray;
`
const Left = styled.View`
    width: 40;
    align-items: flex-start;
`
const Right = styled(Left)`
    align-items: flex-end;
`
const Middle = styled.View`
    flex-grow: 1;
`
const Text = styled.Text`
    font-family: montserratMedium;
    font-size: 16px;
`
