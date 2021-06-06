import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Activity, ListJob, Header } from '../../components'
import * as API from '../../api/Endpoints'
import { LogBox } from 'react-native';
const axios = require('axios');
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const renderPlaceholderLoadingItem = () => {
    var instance = [1, 2];
    return instance.map((el) => {
        return (
            <View
                key={el}
                style={{
                    backgroundColor: 'white',
                    padding: 10,
                    marginVertical: 8,
                    marginHorizontal: 3,
                    borderRadius: 8,
                    shadowColor: 'black',
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 3 },
                    shadowRadius: 10,
                    elevation: 6,
                }}>
                <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item
                    // marginHorizontal={10}
                    // marginVertical={5}
                    >
                        <SkeletonPlaceholder.Item flexDirection="row">
                            <SkeletonPlaceholder.Item flex={1} marginTop={5} >
                                <SkeletonPlaceholder.Item width={70} height={70} borderRadius={10} />
                            </SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item flexDirection="column" marginTop={5} flex={3}>
                                <SkeletonPlaceholder.Item marginTop={5} width={150} height={22} borderRadius={5} />
                                <SkeletonPlaceholder.Item marginTop={5} width={110} height={20} borderRadius={5} />
                                {/* <SkeletonPlaceholder.Item marginTop={5} width={80} height={20} borderRadius={5} /> */}
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flexDirection="row" marginTop={10} justifyContent="space-between">
                            <SkeletonPlaceholder.Item width={120} height={30} borderRadius={5} />
                            <SkeletonPlaceholder.Item marginLeft={5} width={80} height={30} borderRadius={5} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
            </View>
        );
    })
}

const Home = ({ navigation }) => {

    const [listJobs, setListJobs] = useState(null);
    const [isLoadingListJob, setIsLoadingListJob] = useState(true)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // setIsLoadingListJob(true);
            LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
            async function getListJobs() {
                const response = await axios.get(API.LIST_RECRUITMENT_NEWS);
                // console.log(response.status);
                // const dataResponse = response.data.data;
                setListJobs(response.data.data);
                setIsLoadingListJob(false);
            }
            getListJobs();
        });

        return unsubscribe;
    }, [navigation])

    if (isLoadingListJob) {
        return (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={styles.container}>
                    <Header title='Home' />
                    <ScrollView
                        nestedScrollEnabled={true}
                        scrollEnabled={true}
                        style={styles.wrapperContent}>
                        <View>
                            <Text style={styles.title}>Activities</Text>
                            <Activity />
                            <Text style={styles.title}>Suggested Jobs</Text>
                            {renderPlaceholderLoadingItem()}
                        </View>

                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.container}>
                <Header title='Home' />
                <ScrollView
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    style={styles.wrapperContent}>
                    <View>
                        <Text style={styles.title}>Activities</Text>
                        <Activity />
                        <Text style={styles.title}>Suggested Jobs</Text>
                        <ListJob data={listJobs} navigation={navigation} />
                    </View>

                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 112,
        backgroundColor: 'white',
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
