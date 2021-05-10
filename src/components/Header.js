import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
const filterImage = require('../../assets/images/002-menu-vert.png');
const backimage = require('../../assets/images/001-left-arrow.png');

const Header = ({
    left,
    leftIcon,
    right,
    rightIcon,
    title,
    onPressRight,
    onPressLeft,
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.backButton, styles.button]}
                onPress={onPressLeft}>
                { left ? leftIcon ? (
                    leftIcon
                ) : (
                    <Image style={styles.imageSize} source={backimage} />
                ) : null}
            </TouchableOpacity>
            <Text style={styles.titleText}>{title ? title : 'TITLE'}</Text>
            <TouchableOpacity
                style={[styles.fitlerButton, styles.button]}
                onPress={onPressRight}>
                { right ? rightIcon ? (
                    rightIcon
                ) : (
                    <Image style={styles.imageSize} source={filterImage} />
                ) : null}
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 80,
        maxHeight: 80,
        paddingBottom: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },
    imageSize: {
        width: 30,
        height: 30,
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        textAlignVertical: 'center',
        paddingBottom: 8,
    },
    button: {
        padding: 4,
        paddingHorizontal: 25,
    },
});
