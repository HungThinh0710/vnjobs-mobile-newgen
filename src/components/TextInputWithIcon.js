import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    SafeAreaView,
    Image,
    TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';

const TextInputWithIcon = props => {
    const data = props;
    // const [text, onChangeText] = React.useState('Useless Text');

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={[styles.input, data.icon ? { paddingLeft: 55 } : null]}
                onChangeText={data.onChangeText}
                // value={''}
                placeholder={data.placeholder}
                secureTextEntry={data.secureTextEntry}
            />

            {data.icon ? (
                <View style={styles.iconWrapper}>
                    <Icon
                        style={styles.icon}
                        name={data.nameIcon}
                        type={data.typeIcon}
                        size={data.sizeIcon}
                        color={data.colorIcon}
                    />
                </View>
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    input: {
        height: 60,
        marginHorizontal: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#E7E7E7',
        fontSize: 18,
        paddingHorizontal: 16,
    },
    iconWrapper: {
        position: 'absolute',
        top: 12,
        left: 35,
        zIndex: 10,
        width: 35,
        height: 35,
        justifyContent: 'center'
    },
    icon: {
    },
});

export default TextInputWithIcon;
