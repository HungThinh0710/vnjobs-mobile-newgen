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
        marginHorizontal: 10
    }
});

export default Activity;