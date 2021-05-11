import React, {useState, useRef} from 'react';
import {
    FlatList,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Animated,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
    BlurBg,
    PopularJobItem,
    RecentJobItem,
    Search,
    TitleMore,
    Header,
} from '../../components';

const Menu = () => {
    const [isPopup, setIsPopup] = useState(false);
    const floatInValue = useRef(new Animated.Value(-330)).current;
    const floatIn = () => {
        Animated.timing(floatInValue, {
            toValue: 0,
            duration: Platform.OS === 'ios' ? 500 : 1000,
            useNativeDriver: false,
        }).start();
    };

    const floatOut = () => {
        Animated.timing(floatInValue, {
            toValue: -330,
            duration: Platform.OS === 'ios' ? 500 : 1000,
            useNativeDriver: false,
        }).start();
    };

    const onPopupHandle = () => {
        isPopup ? floatOut() : floatIn();
        setIsPopup(!isPopup);
    };

    const initData = [
        {
            id: 'asdf3-243153-faweqr-24332',
            name: 'Apple',
            address: 'LA',
            job: 'UX/UI Designer',
            salary: '80-90K/year',
            type: ['Fulltime', 'Remote'],
            lefttime: '2 days left',
        },
        {
            id: 'sdf-243153-faweqr-2444332',
            name: 'Apple',
            address: 'LA',
            job: 'UX/UI Designer',
            salary: '80-90K/year',
            type: ['Fulltime', 'Remote'],
            lefttime: '2 days left',
        },
        {
            id: 'sdf-543153-faweqr-542',
            name: 'Apple',
            address: 'LA',
            job: 'UX/UI Designer',
            salary: '80-90K/year',
            type: ['Fulltime', 'Remote'],
            lefttime: '2 days left',
        },
        {
            id: 'sdf-543153-dfasf-24332',
            name: 'Google',
            address: 'Singapore',
            job: 'UX/UI Designer',
            salary: '80-90K/year',
            type: ['Fulltime', 'Remote'],
            lefttime: '2 days left',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Menu"
                left
                right
                onPressRight={() => onPopupHandle()}
            />
            <Animated.View
                style={[
                    styles.containerPopup,
                    styles.shadow,
                    {right: floatInValue},
                ]}>
                <TouchableOpacity
                    style={[styles.buttonPopup, styles.shadow]}
                    activeOpacity={0.7}>
                    <Text style={styles.textPopup}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonPopup, styles.shadow]}
                    activeOpacity={0.8}>
                    <Text style={styles.textPopup}>Developing!</Text>
                </TouchableOpacity>
            </Animated.View>
            <View style={styles.wrapperContent}>
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}>
                    <BlurBg />
                    <Search />
                    <TitleMore title="Popular Job" more="See all" />
                    <FlatList
                        style={styles.flatlistViewHorizontal}
                        horizontal={true}
                        data={initData}
                        renderItem={items => {
                            return <PopularJobItem item={items.item} />;
                        }}
                        key={item => item.id}
                        keyExtractor={item => item.id}
                    />
                    <TitleMore title="Recent Job" more="See all" />
                    {initData.map((e, i) => {
                        return <RecentJobItem key={i} item={e} />;
                    })}
                    <View style={styles.paddingBottomIOS}></View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingBottom: Platform.OS === 'android' ? 107 : 0,
    },
    wrapperContent: {
        flex: 1,
        zIndex: 2,
        // marginBottom: 70
    },
    flatlistViewHorizontal: {
        maxHeight: 175,
        height: 175,
        marginBottom: 10,
    },
    flatlistView: {
        flex: 1,
        maxHeight: 320,
        height: 320,
    },
    paddingBottomIOS: {
        marginTop: Platform.OS === 'ios' ? 7 : 0,
        height: Platform.OS === 'ios' ? 70 : 0,
        backgroundColor: '#ffffff',
    },
    containerPopup: {
        position: 'absolute',
        right: 0,
        top: Platform.OS === 'android' ? 80 : 130,
        zIndex: 9,
        width: 320,
        height: 94,
        paddingVertical: 1,
        backgroundColor: '#fff',
        borderRadius: 4,
        flexDirection: 'column',
    },
    buttonPopup: {
        position: 'relative',
        minHeight: 45,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 2,
        marginVertical: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 11,
    },
    textPopup: {
        flex: 1,
        fontSize: 18,
    },
    shadow: {
        shadowColor: Platform.OS === 'android' ? '#000' : '#777',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 6,
        shadowRadius: 5,
        shadowOpacity: 0.5,
    },
});
