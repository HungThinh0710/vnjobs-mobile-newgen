import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    LogBox,
} from 'react-native';
import * as API from '../api/Endpoints';
const axios = require('axios');
const defaultImage = require('../../assets/images/french.png');

const PopularJobItem = ({item, onPress}) => {
    const bgColor = ['#6ECB96', '#6074F9', '#EA5F72'];
    const [lefttime, setLefttime] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [salary, setSalary] = useState('');

    useEffect(() => {
        LogBox.ignoreLogs(['Clean Up useEffect']);
        const convertDate = t => {
            var t = t.split(/[- :]/);
            var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
            return d.toLocaleDateString();
        };

        const getDiffDate = (date1, date2) => {
            const diffTime = date2 - date1;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        };

        const d = new Date();
        const currentDate = d.toLocaleDateString();
        const interviewTime = convertDate(item.end_time);
        const ld = getDiffDate(new Date(currentDate), new Date(interviewTime));
        setLefttime(
            ld > 1
                ? ld + ' days left'
                : ld === 1
                ? ld + ' day left'
                : 'Expired',
        );
        const numberSalary = Math.round(1 + Math.random() * 50);
        setSalary('Thoả thuận');
        async function getOrganzation() {
            const response = await axios.get(
                API.LIST_ORGANIZATION + '/' + item.org_id,
            );
            setOrganizationName(
                response.data.org_name.substring(8, 17) + '...',
            );
        }

        getOrganzation();
    }, []);

    const colorIndex = item.id % 2 === 0 ? 1 : item.id % 3 === 0 ? 2 : 0;
    const backgroundColor = bgColor[colorIndex];
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
                            {organizationName}
                        </Text>
                        <Text style={[styles.textColor, styles.companyAddress]}>
                            {item.city}
                        </Text>
                    </View>
                </View>
                <View style={styles.viewMiddle}>
                    <Text style={[styles.textColor, styles.textJob]}>
                        {item.title}
                    </Text>
                    <Text style={[styles.textColor, styles.textSalary]}>
                        {salary}
                    </Text>
                </View>
                <View style={styles.viewBottom}>
                    <View style={styles.typeJob}>
                        <View style={styles.typeView}>
                            <Text style={[styles.textColor, styles.textType]}>
                                {item.major.major_name}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={[
                            styles.textColor,
                            styles.textLefttime,
                            lefttime === 'Expired' ? {color: 'red'} : null,
                        ]}>
                        {lefttime}
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
        paddingEnd: 6,
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
