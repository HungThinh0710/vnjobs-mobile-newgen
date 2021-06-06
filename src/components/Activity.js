import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

const Activity = () => {

    return (
        <ScrollView
            horizontal={true}>
            <View style={styles.blockGroup}>
                <LottieView
                    style={styles.anim}
                    source={require('../../assets/lottie/profile-animation.json')} speed={1} autoPlay loop />
                <Text style={styles.completeProfile}>Complete Your Profile</Text>
            </View>
            <View style={styles.blockGroup}>
            <LottieView
                    style={styles.anim}
                    source={require('../../assets/lottie/job-analytics.json')} speed={1} autoPlay loop />
                <Text style={styles.viewAnalystic}>View Analystic Jobs</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    blockGroup: {
        backgroundColor: 'white',
        // paddingHorizontal: 50,
        // paddingVertical: 50,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 6, //android

        textAlign: 'center',
        width: 200,
    },
    anim: {
        height: 100,
        alignSelf: 'center'
    },
    completeProfile: {
        paddingTop: 3,
        color:'#20365F',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    viewAnalystic:{
        paddingTop: 3,
        color:'#ff892d',
        textAlign: 'center',
        fontWeight: 'bold'
    }

});

export default Activity;