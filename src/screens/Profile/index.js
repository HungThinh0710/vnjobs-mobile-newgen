import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { Header, BlueBg } from '../../components'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Profile = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Profile' left onPressLeft={() => { navigation.goBack() }} />
            <BlueBg >
                <Text>Hello all</Text>
                <ScrollView
                    scrollEnabled={true}
                    style={styles.wrapperContent}>

                </ScrollView>
            </BlueBg>

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
    wrapperContent: {
        flex: 1,
        zIndex: 2,
        marginBottom: 112,
        // marginHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: 'red'
    },
})
