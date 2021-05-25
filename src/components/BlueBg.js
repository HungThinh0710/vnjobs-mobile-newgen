import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const imageBG = require('../../assets/backgrounds/bg_gradient.png');

const BlueBg = () => (
    <ImageBackground source={imageBG} style={styles.background} />

);

export default BlueBg;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});
