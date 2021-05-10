import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TitleMore = ({onPress, title = 'Popular', more = 'See all'}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Text style={styles.textButton}>{more}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TitleMore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        maxHeight: 45,
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textButton: {
        fontSize: 12,
        color: '#666666',
    },
});
