import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements';

const SettingButton = ({
    left,
    right,
    onPress,
    title = 'Personal Information',
}) => {
    return (
        <TouchableOpacity
            style={[styles.wrapperContent, styles.shadow]}
            onPress={onPress}
            activeOpacity={0.8}>
            <View style={styles.leftContent}>
                {left ? (
                    left
                ) : (
                    <Icon
                        style={styles.leftIcon}
                        name="user-shield"
                        type="font-awesome-5"
                        size={24}
                    />
                )}
            </View>
            <View style={styles.centerContent}>
                <Text style={styles.text}>{title}</Text>
            </View>
            <View style={styles.rightContent}>
                {right ? (
                    right
                ) : (
                    <Icon
                        style={styles.rightIcon}
                        name="edit"
                        type="font-awesome-5"
                        size={24}
                        color='#ADE2FF'
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

export default SettingButton;

const styles = StyleSheet.create({
    wrapperContent: {
        flexDirection: 'row',
        height: 80,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#FAFAFA',
    },
    shadow: {
        shadowColor: '#9c9c9c',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
        shadowRadius: 3,
        shadowOpacity: 0.79,
    },
    leftContent: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    centerContent: {
        flex: 1
    },
    rightContent: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightIcon: {
        width: 45,
        height: 45,
        borderRadius: 23,
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
    },
});
