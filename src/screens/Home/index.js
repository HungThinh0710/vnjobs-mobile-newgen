import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Activity, ListJob } from '../../components'

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activity</Text>
            <Activity />
            <Text style={styles.title}>Suggested Job</Text>
            <ListJob />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10
    },
    title: {
        fontWeight: 'bold'
    }
})
