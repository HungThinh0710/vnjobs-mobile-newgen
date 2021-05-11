import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
} from 'react-native';
const dafaultImage = require('../../assets/images/french.png');
const windowWidth = Dimensions.get('window').width;
const RecentJobItem = ({ key, item, onPress }) => {
    return (
        <View style={styles.container} key={key}>
            <TouchableOpacity
                style={[styles.button, styles.shadow]}
                activeOpacity={0.8}
                onPress={onPress}>
                <View style={styles.imageView}>
                    <Image source={dafaultImage} style={styles.image} />
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.textJob}>{item.job}</Text>
                    <Text style={styles.textName}>
                        {item.name} | {item.salary}
                    </Text>
                    <View style={styles.typeJob}>
                        {item.type.map((e, i) => {
                            return (
                                <View style={styles.typeView}>
                                    <Text style={[styles.textType]} key={i}>
                                        {e}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
                <View style={styles.lefttimeView}>
                    <Text style={styles.lefttimeText}>{item.lefttime}</Text>
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
