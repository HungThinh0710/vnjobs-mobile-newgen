import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Activity, ListJob, Header } from '../../components'
import * as API from '../../api/Endpoints'
import { LogBox } from 'react-native';
const axios = require('axios');

const Home = () => {

    const [listJobs, setListJobs] = useState(null);
    const [isLoadingListJob, setIsLoadingListJob] = useState(true)

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        async function getListJobs() {
            const response = await axios.get(API.LIST_RECRUITMENT_NEWS);
            // console.log(response.status);
            // const dataResponse = response.data.data;
            setListJobs(response.data.data);
        }
        getListJobs();

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Home' />
            <ScrollView
                scrollEnabled={true}
                style={styles.wrapperContent}>
                <View>
                    <Text style={styles.title}>Activities</Text>
                    <Activity />
                    <Text style={styles.title}>Suggested Jobs</Text>
                    <ListJob data={listJobs} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 112,
        // marginHorizontal: 10
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
