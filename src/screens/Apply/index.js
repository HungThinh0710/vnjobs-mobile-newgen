import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Dimensions,
    FlatList,
    Image,
} from 'react-native';
import {Header, BlurBg} from '../../components';
import Icon from 'react-native-vector-icons/Fontisto';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
const axios = require('axios');
import * as API from '../../api/Endpoints';
import {LogBox} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const AS = require('../../utilities/AsyncStorageHandler');
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: 112,
        backgroundColor: '#ffffff',
    },
    wrapperContent: {
        flex: 1,
        zIndex: 2,
        marginBottom: 112,
        // marginHorizontal: 10,
    },
    unavailable: {
        // backgroundColor: 'lightblue'
        // paddingTop: 120,
    },
    unavailableText: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 10,
    },
    signInNow: {
        padding: 15,
        width: 150,
        backgroundColor: '#3D7DFF',
        color: 'black',
        textAlign: 'center',
        borderRadius: 10,
        marginTop: 10,
        color: '#FFF',
        fontSize: 17,
    },
    context: {
        height: Dimensions.get('window').height - (145 + 80),
        justifyContent: 'center',
    },
    wrapSignIn: {
        alignItems: 'center',
    },
    wrapFlatListView: {
        backgroundColor: 'white',
        marginHorizontal: 10,
    },
    flatlistViewVertical: {
        // maxHeight: 175,
        // height: 175,
        // marginBottom: 10,
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 3,
        borderRadius: 8,
        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 10,
        elevation: 6, //android
    },
    titleAndStatus: {
        flexDirection: 'row',
    },
    titleItem: {
        fontSize: 19,
        flex: 3,
        fontWeight: 'bold',
    },
    statusItem: {
        flex: 1,
        textAlign: 'right',
        color: '#ED3E23',
        fontWeight: 'bold',
    },
    contentItem: {
        flexDirection: 'row',
    },
    contentLeftItem: {
        flex: 3,
        flexDirection: 'column',
        padding: 5,
    },
    companyContextItem: {
        fontSize: 14,
        color: '#EF3E23',
        fontWeight: 'bold',
    },
    cityContextItem: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 3,
    },
    workTypeTagItem: {
        marginTop: 3,
        width: 100,
        paddingVertical: 3,
        backgroundColor: '#CCE8FF',
        color: '#07B1B8',
        textAlign: 'center',
        borderRadius: 8,
    },
    contentRightItem: {
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
        // justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
    tinyLogo: {
        width: 65,
        height: 65,
    },
    anim: {
        height: 220,
        alignSelf: 'center',
    },
});

const defaultStructView = [{id: 1}, {id: 2}, {id: 3}];

const renderItem = ({item}) => (
    <View style={styles.item}>
        {console.log(item)}
        <View style={styles.titleAndStatus}>
            <Text style={styles.titleItem}>{item.recruitment_news.title} </Text>
            <Text style={styles.statusItem}>Applied</Text>
        </View>
        <View style={styles.contentItem}>
            <View style={styles.contentLeftItem}>
                {console.log('ORG: NAME')}
                {console.log(item.recruitment_news.org.org_name)}
                <Text style={styles.companyContextItem}>
                    {item.recruitment_news.org.org_name}
                </Text>
                <Text style={styles.cityContextItem}>
                    {item.recruitment_news.city}
                </Text>
                <Text style={styles.workTypeTagItem}>
                    {item.recruitment_news.work_type}
                </Text>
            </View>
            <View style={styles.contentRightItem}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>
        </View>
    </View>
);

const showUnavailable = () => (
    <View style={styles.unavailable}>
        <Text style={styles.unavailableText}>
            <Icon name="wink" size={145} color="#3D7DFF" />
        </Text>
        <Text style={styles.unavailableText}>
            You need sign in to view applied jobs
        </Text>
        <TouchableOpacity style={styles.wrapSignIn}>
            <Text style={styles.signInNow}>Sign In</Text>
        </TouchableOpacity>
    </View>
);

const showEmptyApplied = () => (
    <View style={styles.context}>
        {/* <Text style={styles.unavailableText}><IconAntDesign name="inbox" size={100} color="#3D7DFF" /></Text> */}
        <LottieView
            style={styles.anim}
            // resizeMode='cover'
            // autoSize
            // aspectRatio={2}
            // width={300}
            // height={300}
            // alignItems="center"
            source={require('../../../assets/lottie/not-found.json')}
            speed={1}
            autoPlay
            loop
        />
        <Text style={styles.unavailableText}>You have not apply any job.</Text>
    </View>
);

const showAppliedJob = payload => (
    <View style={styles.wrapFlatListView}>
        {/* <Text style={styles.unavailableText}><IconAntDesign name="inbox" size={100} color="#3D7DFF" /></Text>
        <Text style={styles.unavailableText}>Welcome to my world.</Text> */}
        <FlatList
            style={styles.flatlistViewVertical}
            data={payload}
            renderItem={renderItem}
            key={item => item.id}
            keyExtractor={item => item.id}
        />
    </View>
);

const renderPlaceholderLoadingItem = ({item}) => (
    <View
        style={{
            backgroundColor: 'white',
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 3,
            borderRadius: 8,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: {width: 0, height: 3},
            shadowRadius: 10,
            elevation: 6,
        }}>
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item marginHorizontal={10}>
                {/* JOBNAME & STATUS */}
                <SkeletonPlaceholder.Item
                    flexDirection="row"
                    justifyContent="space-between">
                    <SkeletonPlaceholder.Item
                        width={250}
                        height={30}
                        borderRadius={5}
                    />
                    <SkeletonPlaceholder.Item
                        marginLeft={5}
                        width={80}
                        height={22}
                        borderRadius={5}
                    />
                </SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item flexDirection="row">
                    <SkeletonPlaceholder.Item flexDirection="column" flex={3}>
                        <SkeletonPlaceholder.Item
                            marginTop={5}
                            width={110}
                            height={20}
                            borderRadius={5}
                        />
                        <SkeletonPlaceholder.Item
                            marginTop={5}
                            width={150}
                            height={22}
                            borderRadius={5}
                        />
                        <SkeletonPlaceholder.Item
                            marginTop={5}
                            width={80}
                            height={20}
                            borderRadius={5}
                        />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item
                        flex={1}
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <SkeletonPlaceholder.Item
                            width={60}
                            height={60}
                            borderRadius={10}
                        />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    </View>
);

const showPlaceholderLoadingForList = () => (
    <View style={styles.wrapFlatListView}>
        <FlatList
            style={{paddingVertical: 5}}
            data={defaultStructView}
            renderItem={renderPlaceholderLoadingItem}
            key={item => item.id}
            keyExtractor={item => item.id}
        />
    </View>
);

const Apply = ({navigation}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [payload, setPayload] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            async function getAppliedJobs(accessToken) {
                try {
                    const payload = await axios.get(API.LIST_APPLIED_JOBS, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json; charset=utf-8',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    console.log('Axios STT Code: ' + payload.status);
                    if (payload.status == 200) {
                        setIsLoading(false);
                        // console.log("Payload length: " + payload.data.length);
                        // if (payload.data.length <= 0) {
                        //     console.log("Ban chua applied cai nào");
                        // }
                        setPayload(payload.data);
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }

            async function checkIsLogged() {
                setIsLoading(true);
                const accessToken = await AS.getAccessToken();
                if (typeof accessToken != 'undefined' || accessToken !== null) {
                    setIsLogged(true);
                    getAppliedJobs(accessToken);
                }
            }
            setIsLoading(true);
            checkIsLogged();
        });
        return unsubscribe;
    }, []);

    // if (isLoading) {
    //     return (
    //         <ScrollView
    //             scrollEnabled={true}
    //             style={styles.wrapperContent}>
    //             {/* <BlurBg /> */}
    //             {showPlaceholderLoadingForList()}
    //         </ScrollView>
    //     );
    // }
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Applied Jobs" />
            {isLoading ? (
                <ScrollView scrollEnabled={true} style={styles.wrapperContent}>
                    {/* <BlurBg /> */}
                    {showPlaceholderLoadingForList()}
                </ScrollView>
            ) : isLogged ? (
                <ScrollView scrollEnabled={true} style={styles.wrapperContent}>
                    <BlurBg />
                    {payload.length <= 0
                        ? showEmptyApplied()
                        : showAppliedJob(payload)}
                </ScrollView>
            ) : (
                <View scrollEnabled={true} style={styles.wrapperContent}>
                    <BlurBg />
                    <View style={styles.context}>{showUnavailable()}</View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Apply;
