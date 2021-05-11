import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Activity, ListJob, Header } from '../../components'

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Home' />
            <View style={styles.wrapperContent}>
                <ScrollView>
                    <Text style={styles.title}>Activity</Text>
                    <Activity />
                    <Text style={styles.title}>Suggested Job</Text>
                    <ListJob />
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 105,
    },
    title: {
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 18
    },
    wrapperContent: {
        flex: 1,
        zIndex: 2,
        marginHorizontal: 10,
    },
})
