import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

const Menu = () => {
    return (
        <View>
            <Text>Menu Screen</Text>

            <Text>
                <Icon
                    name='sc-telegram'
                    type='evilicon'
                    color='#517fa4'
                />
            </Text>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({})
