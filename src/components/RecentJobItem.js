import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    LogBox
} from 'react-native';
import * as API from '../api/Endpoints';
const axios = require('axios');
const dafaultImage = require('../../assets/images/french.png');
const windowWidth = Dimensions.get('window').width;
const RecentJobItem = ({item, onPress}) => {
    const [salary, setSalary] = useState('');
    const [lefttime, setLefttime] = useState('');
    useEffect(() => {
        LogBox.ignoreLogs(['Clean Up useEffect']);
        const convertDate = t => {
            var t = t.split(/[- :]/);
            var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
            return d.toLocaleDateString();
        };

        const getDiffDate = (date1, date2) => {
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        };

        const d = new Date();
        const currentDate = d.toLocaleDateString();
        const interviewTime = convertDate(item.interview_start_time);

        setLefttime(
            getDiffDate(new Date(currentDate), new Date(interviewTime)) +
                ' days left',
        );
        const numberSalary = Math.round(1 + Math.random() * 50);
        setSalary(numberSalary + 'K/year');
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, styles.shadow]}
                activeOpacity={0.8}
                onPress={onPress}>
                <View style={styles.imageView}>
                    <Image source={dafaultImage} style={styles.image} />
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.textJob}>{item.title}</Text>
                    <Text style={styles.textName}>
                        {item.city} | {salary}
                    </Text>
                    <View style={styles.typeJob}>
                        <View style={styles.typeView}>
                            <Text style={[styles.textType]}>
                                {item.major.major_name}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.lefttimeView}>
                    <Text style={styles.lefttimeText}>{lefttime}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default RecentJobItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    button: {
        flex: 1,
        maxHeight: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
        borderRadius: 14,
        flexDirection: 'row',
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: -2,
            height: 4,
        },
        elevation: 6,
        shadowRadius: 5,
        shadowOpacity: 0.75,
    },
    imageView: {
        flex: 1,
        maxWidth: 60,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(196, 196, 196, 0.3)',
        borderRadius: 16,
    },
    image: {
        width: 30,
        height: 30,
        alignSelf: 'center',
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
    contentView: {
        maxWidth: windowWidth - 180,
        width: windowWidth - 180,
    },
    textJob: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    textName: {
        fontSize: 10,
        fontWeight: '400',
    },
    lefttimeText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#6ECB96',
    },
});
