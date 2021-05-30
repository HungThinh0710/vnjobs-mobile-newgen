import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground, Image } from 'react-native'
import { Header, BlueBg } from '../../components'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const axios = require('axios');
import * as API from '../../api/Endpoints'
const AS = require('../../utilities/AsyncStorageHandler');
import LottieView from 'lottie-react-native';
const imageBG = require('../../../assets/backgrounds/bg_gradient.png');

const onPreloading = () => (
    <View>

    </View>
);

const Profile = ({ navigation }) => {

    const [user, setUser] = useState({});


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            async function getUser(accessToken) {
                try {
                    const payload = await axios.get(API.USER, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json; charset=utf-8',
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    console.log("Axios STT Code: " + payload.status);
                    if (payload.status == 200) {
                        console.log(payload.data);
                        setUser(payload.data);
                        // setIsLoading(false)
                        // console.log("Payload length: " + payload.data.length);
                        // if (payload.data.length <= 0) {
                        //     console.log("Ban chua applied cai nào");
                        // }
                        // setPayload(payload.data);
                    }
                    else {
                        navigation.navigate("Login");
                    }
                    // setIsLoading(false)

                } catch (error) {
                    console.error(error);
                    // setIsLoading(false)
                }

            }
            async function initBackend() {
                const accessToken = await AS.getAccessToken();
                if (typeof (accessToken) != 'undefined' || accessToken !== null) {
                    // setIsLogged(true)
                    getUser(accessToken);
                }
            }
            initBackend();
        });

        return unsubscribe;
    }, [navigation]);


    return (
        <SafeAreaView style={styles.container}>
            <Header title='Profile' left onPressLeft={() => { navigation.goBack() }} />
            <ImageBackground source={imageBG} style={styles.background}>
                <View>
                    <ScrollView
                        scrollEnabled={true}
                        style={styles.wrapperContent}>
                        <View style={styles.wrapImg}>
                            <Image
                                style={styles.tinyLogo}
                                source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png'
                                }}
                            />
                        </View>
                        <View style={styles.wrapperNameAndApplied}>
                            <Text style={styles.name}>{user.email}</Text>

                        </View>
                        <View style={styles.wrapStatistical}>
                            <View style={styles.statistical}>
                                <Text style={{ fontSize: 20, color: "#3F6FD6" }}>12</Text>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Jobs Applied</Text>
                            </View>
                            <View style={styles.statistical}>
                                <Text style={{ fontSize: 20, color: "#3F6FD6" }}>11</Text>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Interview </Text>

                            </View>
                        </View>
                        <View style={styles.wrapInfo}>
                            <Text style={styles.titleInfo}>
                                Họ và tên
                            </Text>
                            <Text style={styles.contentInfo}>
                                {user.first_name + ' ' + user.last_name}
                            </Text>
                        </View>
                        <View style={styles.wrapInfo}>
                            <Text style={styles.titleInfo}>
                                Ngày sinh
                            </Text>
                            <Text style={styles.contentInfo}>
                                {user.dob}
                            </Text>
                        </View>
                        <View style={styles.wrapInfo}>
                            <Text style={styles.titleInfo}>
                                Email
                            </Text>
                            <Text style={styles.contentInfo}>
                                {user.email}
                            </Text>
                        </View>
                        <View style={styles.wrapInfo}>
                            <Text style={styles.titleInfo}>
                                Facebook Url
                            </Text>
                            <Text style={styles.contentInfo}>
                                {user.social_facebook}
                            </Text>
                        </View>
                        <View style={styles.wrapInfo}>
                            <Text style={styles.titleInfo}>
                                LinkedIn
                            </Text>
                            <Text style={styles.contentInfo}>
                                {user.social_linkedin}
                            </Text>
                        </View>
                    </ScrollView>

                </View>
            </ImageBackground>

        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: 112,
        backgroundColor: '#ffffff',
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        // alignContent: "center",
        // alignItems: "center",

    },
    wrapperContent: {
        marginBottom: 112,
    },
    tinyLogo: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 15,
        borderColor: '#E6EBFD'
    },
    wrapImg: {
        paddingTop: 40,
        alignItems: 'center'
    },
    wrapperNameAndApplied: {
        alignItems: 'center'
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10
    },
    wrapStatistical: {
        marginHorizontal: 5,
        marginVertical: 10,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    statistical: {
        backgroundColor: '#FFF',
        marginHorizontal: 5,
        marginVertical: 20,
        alignItems: 'center',
        paddingVertical: 20,
        width: 170,
        borderRadius: 10,
        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 6, //android
    },
    wrapInfo: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#FFF",
        padding: 10,

        borderRadius: 10,
        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 6, //android
    },
    titleInfo: {
        flex: 1,
        fontSize: 17,
        // backgroundColor: 'blue'
    },
    contentInfo: {
        flex: 1,
        fontSize: 17,
        // backgroundColor: 'red'
    }
})
