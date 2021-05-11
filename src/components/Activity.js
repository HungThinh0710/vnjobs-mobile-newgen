import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, ScrollView } from 'react-native';

const Activity = () => {

    return (
        <ScrollView
            horizontal={true}>
            <View style={styles.blockGroup}>
                <Text>Hi</Text>

            </View>
            <View style={styles.blockGroup}>
                <Text>Hi</Text>

            </View>
            <View style={styles.blockGroup}>
                <Text>Hi</Text>

            </View>
            <View style={styles.blockGroup}>
                <Text>Hi</Text>

            </View>
            <View style={styles.blockGroup}>
                <Text>Hi</Text>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    blockGroup: {
        backgroundColor: 'white',
        paddingHorizontal: 50,
        paddingVertical: 50,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 6, //android

    }
});

export default Activity;