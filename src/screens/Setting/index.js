import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Header } from '../../components'

const Setting = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Settings' />
        </SafeAreaView>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})
