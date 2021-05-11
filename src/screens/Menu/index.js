import React from 'react';
import {
    FlatList,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    BlurBg,
    PopularJobItem,
    RecentJobItem,
    Search,
    TitleMore,
    Header,
} from '../../components';

const Menu = () => {
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
            id: 'sdf-243153-faweqr-24332',
            name: 'Apple',
            address: 'LA',
            job: 'UX/UI Designer',
            salary: '80-90K/year',
            type: ['Fulltime', 'Remote'],
            lefttime: '2 days left',
        },
        {
            id: 'sdf-543153-faweqr-24332',
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
            <Header title="Menu" left right />
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
        backgroundColor: '#ffffff'
    }
});
