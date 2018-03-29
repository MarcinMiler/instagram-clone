import React from 'react'
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components'
import { P } from '../Styled'
import Icon from 'react-native-vector-icons/Feather'

const backAction = NavigationActions.back()

const Navbar = ({ leftIcon, leftAction, rightIcon, rightAction, title }) => (
    <Container>
        {leftIcon &&
            leftAction && (
                <Wrap>
                    <Icon
                        onPress={() => leftAction()}
                        name={leftIcon}
                        size={24}
                        color="#000"
                    />
                </Wrap>
            )}
        <Middle>
            <P>{title}</P>
        </Middle>

        {rightIcon &&
            rightAction && (
                <Wrap>
                    <Icon
                        onPress={() => rightAction()}
                        name={rightIcon}
                        size={24}
                        color="#000"
                    />
                </Wrap>
            )}
    </Container>
)

export default Navbar

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
const Wrap = styled.View`
    width: 40;
`
const Middle = styled.View`
    flex-grow: 1;
`
