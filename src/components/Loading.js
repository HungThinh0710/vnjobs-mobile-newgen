import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';


const Loading = (props) => {
    const { msg = "Please wait ..." } = props;
    const { authen = false } = props;
    return (
        <View style={styles.container}>
            <View style={styles.msgBox}>
                <View style={styles.wrapperAnim}>
                    {
                        authen
                            ? (
                                <LottieView
                                    style={styles.ltViewAuthen}
                                    resizeMode='cover'
                                    autoSize
                                    // aspectRatio={2}
                                    source={require('../../assets/lottie/login-loading.json')} speed={1.5} autoPlay loop />
                            )
                            : (
                                <LottieView
                                    style={styles.ltView}
                                    resizeMode='cover'
                                    autoSize
                                    // aspectRatio={2}
                                    source={require('../../assets/lottie/triangle-loading.json')} speed={1.5} autoPlay loop />
                            )
                    }
                </View>
                <Text style={styles.msg}>{msg}</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        // opacity: 0.4,
        height: '100%',
        width: '100%',
        zIndex: 999,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    msgBox: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '80%',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E7E7E7',
        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 6, //android
    },
    wrapperAnim: {
        // width: '100%',
        // height: 300,
        // height: 300,
        // aspectRatio: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animationFrm: {
        alignSelf: 'center',
        // padding: 350,
    },
    msg: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
    ltView: {
        width: 200,
        height: 200,
        transform: [{ scale: 1.2 }],
    },
    ltViewAuthen: {
        width: 200,
        height: 200,
    }
});

export default Loading;