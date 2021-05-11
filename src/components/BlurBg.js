import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const BlurBg = () => {
    const blur = [
        {
            width: 90,
            height: 85,
            top: 0,
            left: 35,
            shadowColor: '#6074F9',
        },
        {
            width: 90,
            height: 78,
            top: 30,
            left: 200,
            shadowColor: '#ADE2FF',
        },
        {
            width: 150,
            height: 98,
            top: 5,
            left: 100,
            shadowColor: '#ADE2FF',
        },
    ];
    return (
        <View style={styles.backgroundBlur}>
            {blur.map((e, i) => {
                return (
                    <View
                        key={i}
                        style={[
                            styles.blurBound,
                            {
                                width: e.width,
                                height: e.height,
                                top: e.top,
                                left: e.left,
                                shadowColor: e.shadowColor,
                            },
                        ]}></View>
                );
            })}
        </View>
    );
};

export default BlurBg;

const styles = StyleSheet.create({
    backgroundBlur: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 7,
        width: '90%',
        height: 130,
    },
    blurBound: {
        position: 'absolute',
        borderRadius: 88,
        backgroundColor: 'rgba(255,255,255, .15)',
        shadowOffset: {
            width: -2,
            height: 12,
        },
        shadowRadius: 22,
        shadowOpacity: 1,
    },
});
