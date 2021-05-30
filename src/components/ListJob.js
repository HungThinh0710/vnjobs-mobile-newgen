import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const DATA_EXAMPLE = [
    { id: 1, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
    // { id: 2, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
    // { id: 3, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
    // { id: 4, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
    // { id: 5, job_name: 'Product Designer, Google Inc', company: 'Google inc', city: ', Singapore', major: 'Remote' },
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
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.companyName}>{`${item.major.major_name}, ${item.city}`}</Text>
            </View>
            <View style={styles.contentRight}>
                <Text><Icon name="right" size={25} color="black" /></Text>
            </View>
        </View>
        <View style={styles.majorForm}>
            <View>
                <Text style={styles.majorTag}>{item.work_type}</Text>

            </View>
            <View >
                <Text style={styles.salary}>Thoả thuận</Text>
            </View>
        </View>
    </View>
);

const ListJob = (props) => {
    const data = props;
    // console.log(data.data);
    const renderItem = ({ item }) => (

        <Item item={item} />
    );
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList
                    nestedScrollEnabled={true}
                    data={data.data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 3,
        borderRadius: 8,
        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 6, //android
    },
    content: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    contentLogo: {
        paddingRight: 10
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    contentMiddle: {
        flex: 4,
        // backgroundColor: 'lightgrey',
        textAlignVertical: 'center'
    },
    jobTitle: {
        fontWeight: '800',
        fontSize: 15,
    },
    companyName: {
        fontSize: 13,
        color: '#FF7C7F',
        fontWeight: 'bold'
    },
    contentRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    majorForm: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    majorTag: {
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: '#E9F5FF',
        color: '#4CB2FF',
        borderRadius: 2,
        fontWeight: 'bold'
    },
    salary: {
        paddingVertical: 5,
        color: '#FE5A5D',
        fontWeight: 'bold'
    }
});

export default ListJob;