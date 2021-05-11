import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Image } from 'react-native';

const DATA_EXAMPLE = [
    { id: 1, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
    { id: 2, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
    { id: 3, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
    { id: 4, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
    { id: 5, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
];

const Item = ({ item }) => (
    <View style={styles.item}>
        <View style={styles.content}>
            <View style={styles.contentLogo}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png'
                    }}
                />
            </View>
            <View style={styles.contentMiddle}>
                <Text style={styles.jobTitle}>{item.job_name}</Text>
                <Text style={styles.companyName}>{item.company + item.city}</Text>
            </View>

        </View>
        <View style={styles.majorForm}>
            <View>
                <Text style={styles.majorTag}>Remote</Text>

            </View>
            <View>
                <Text style={styles.salary}>$1000</Text>

            </View>
        </View>
    </View>
);

const ListJob = () => {
    const renderItem = ({ item }) => (

        <Item item={item} />
    );
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA_EXAMPLE}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 8
    },
    content: {
        flexDirection: 'row',

    },
    contentLogo: {

    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    contentMiddle: {

    },
    jobTitle: {
        fontWeight: '800',
        fontSize: 15
    },
    companyName: {
        fontSize: 12,
        color: 'red',
        fontWeight: '100'
    },
    contentRight: {

    },
    majorForm: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    majorTag: {
        padding: 5,
        backgroundColor: '#E9F5FF',
        color: ''
    },
    salary: {

    }
});

export default ListJob;