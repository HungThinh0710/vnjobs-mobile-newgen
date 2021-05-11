import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
const defaultImage = require('../../assets/images/french.png');

const PopularJobItem = ({item, onPress}) => {
    const bgColor = ['#6ECB96', '#6074F9', '#EA5F72'];

    const colorIndex = Math.round(0 + Math.random() * 2);
    const backgroundColor = bgColor[colorIndex];
    console.log(backgroundColor);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={[styles.button, {backgroundColor: backgroundColor}]}>
                <View style={styles.viewTop}>
                    <View style={styles.imageView}>
                        <Image
                            source={item.iamge ? item.image : defaultImage}
                            style={{width: 25, height: 25}}
                        />
                    </View>
                    <View style={styles.companyDetailView}>
                        <Text style={[styles.textColor, styles.companyName]}>
                            {item.name}
                        </Text>
                        <Text style={[styles.textColor, styles.companyAddress]}>
                            {item.address}
                        </Text>
                    </View>
                </View>
                <View style={styles.viewMiddle}>
                    <Text style={[styles.textColor, styles.textJob]}>
                        {item.job}
                    </Text>
                    <Text style={[styles.textColor, styles.textSalary]}>
                        {item.salary}
                    </Text>
                </View>
                <View style={styles.viewBottom}>
                    <View style={styles.typeJob}>
                        {item.type.map((e, i) => {
                            return (
                                <View style={styles.typeView}>
                                    <Text
                                        style={[
                                            styles.textColor,
                                            styles.textType,
                                        ]}
                                        key={i}>
                                        {e}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    <Text style={[styles.textColor, styles.textLefttime]}>
                        {item.lefttime}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PopularJobItem;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10,
    },
    button: {
        width: 155,
        height: 155,
        borderRadius: 14,
        padding: 7,
        overflow: 'hidden',
    },
    textColor: {
        color: '#fff',
    },
    viewTop: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 41,
        maxHeight: 41,
    },
    imageView: {
        width: 41,
        height: 41,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(196, 196, 196, 0.2)',
        borderRadius: 14,
    },
    companyDetailView: {
        paddingStart: 6,
        justifyContent: 'center',
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
    },
    companyAddress: {
        fontSize: 10,
        fontWeight: '400',
    },
    viewMiddle: {
        flex: 1,
        minHeight: 60,
        maxHeight: 60,
        justifyContent: 'center',
    },
    textJob: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textSalary: {
        fontSize: 12,
        fontWeight: '400',
    },
    viewBottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    typeJob: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    typeView: {
        paddingHorizontal: 12,
        paddingVertical: 3,
        marginRight: 3,
        borderRadius: 6,
        backgroundColor: 'rgba(196, 196, 196, 0.31)',
    },
    textType: {
        fontSize: 11,
        fontWeight: '700',
    },
    textLefttime: {
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '600',
    },
});
