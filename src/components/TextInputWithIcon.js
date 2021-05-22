import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


const TextInputWithIcon = (props) => {
    const data = props;
    const [text, onChangeText] = React.useState("Useless Text");

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 5
    },
    input: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E7E7E7'
    }
});

export default TextInputWithIcon;