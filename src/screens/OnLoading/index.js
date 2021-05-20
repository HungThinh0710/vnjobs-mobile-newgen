import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const OnLoading = () => {
    return (
        <View style={styles.container}>
            <Text>Loading Screen</Text>
        </View>
    )
}

export default OnLoading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
