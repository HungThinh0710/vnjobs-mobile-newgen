import React, {useState, useRef, useEffect} from 'react';
import {
    FlatList,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    Animated,
    RefreshControl,
    LogBox,
    Keyboard,
} from 'react-native';
import {CheckBox} from 'native-base';
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
import {Radio} from 'native-base';
import * as API from '../../api/Endpoints';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const axios = require('axios');
const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const Menu = () => {
    const rnd = Math.round(99 + Math.random() * 1000);
    const [isPopup, setIsPopup] = useState(false);
    const [postData, setPostData] = useState(null);
    const [popularPost, setPopularPost] = useState(null);
    const [listMajor, setListMajor] = useState(null);
    const [recentPost, setRecentPost] = useState(null);
    const [majorFilter, setMajorFilter] = useState(null);
    const [search, setSearch] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const [searchPost, setSearchPost] = useState(null);
    const [isFilter, setIsFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState({
        city: false,
        title: false,
        work_type: false,
    });
    const [refreshing, setRefreshing] = React.useState(false);
    const floatInValue = useRef(new Animated.Value(-330)).current;
    const filterValue = useRef(new Animated.Value(-310)).current;

    const openFilter = () => {
        Animated.timing(filterValue, {
            toValue: 0,
            duration: Platform.OS === 'ios' ? 500 : 1000,
            useNativeDriver: false,
        }).start();
    };

    const closeFilter = () => {
        Animated.timing(filterValue, {
            toValue: -310,
            duration: Platform.OS === 'ios' ? 500 : 1000,
            useNativeDriver: false,
        }).start();
    };

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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setIsLoading(true);
        wait(1200).then(() => {
            setRefreshing(false);
            setIsLoading(false);
        });
    }, []);

    const onPopupHandle = () => {
        isPopup ? floatOut() : floatIn();
        setIsPopup(!isPopup);
    };

    const onFilterClickHandle = () => {
        isFilter ? closeFilter() : openFilter();
        setIsFilter(!isFilter);
    };

    useEffect(() => {
        LogBox.ignoreLogs(['Clean Up useEffect']);
        function getListJobs() {
            axios.get(API.LIST_RECRUITMENT_NEWS).then(response => {
                setIsLoading(false);
                let i = 0,
                    j = 0;
                const popularTemp = [];
                const postTemp = [];
                response.data.data.forEach(e => {
                    if (i < 5) {
                        i++;
                        popularTemp.push(e);
                    }
                    if (j < 10) {
                        j++;
                        postTemp.push(e);
                    }
                });
                setPostData(postTemp);
                setPopularPost(popularTemp);
            });
        }
        function getMajor() {
            axios.get(API.LIST_MAJOR).then(response => {
                setIsLoading(false);
                if (response.status === 200) {
                    setListMajor(response.data);
                }
            });
        }

        setIsLoading(true);
        getMajor();
        getListJobs();
    }, []);

    const getListJobByFilter = majorName => {
        axios.get(API.LIST_RECRUITMENT_NEWS_SORT_BY_MAJOR).then(response => {
            if (response.status === 200) {
                if (response.data) {
                    response.data.forEach(e => {
                        if (e.major_name === majorName) {
                            const r = e.recruitment_news;
                            const erTemp = [];
                            r.forEach(er => {
                                let rn = {
                                    id: er.id,
                                    org_id: er.org_id,
                                    author_id: er.author_id,
                                    major_id: er.major_id,
                                    title: er.title,
                                    content: er.content,
                                    address: er.address,
                                    city: er.city,
                                    work_type: er.work_type,
                                    start_time: er.start_time,
                                    end_time: er.end_time,
                                    interview_start_time:
                                        er.interview_start_time,
                                    interview_end_time: er.interview_end_time,
                                    created_at: er.created_at,
                                    updated_at: er.updated_at,
                                    major: {
                                        major_name: majorName,
                                    },
                                };
                                erTemp.push(rn);
                            });
                            setRecentPost(erTemp);
                        }
                    });
                }
            }
        });
    };

    const filterItemOnClickHandle = majorName => {
        setMajorFilter(majorName);
        setIsLoading(true);
        getListJobByFilter(majorName);
        wait(1200).then(() => setIsLoading(false));
        console.log(recentPost);
    };

    const LoadingSkeletionPlaceholder = () => {
        return (
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center"
                    marginHorizontal={10}
                    marginVertical={12}
                    borderRadius={16}>
                    <SkeletonPlaceholder.Item
                        width={60}
                        height={60}
                        borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item marginLeft={20}>
                        <SkeletonPlaceholder.Item
                            width={120}
                            height={10}
                            borderRadius={4}
                        />
                        <SkeletonPlaceholder.Item
                            marginTop={6}
                            width={120}
                            height={10}
                            borderRadius={4}
                        />

                        <SkeletonPlaceholder.Item
                            marginTop={12}
                            width={70}
                            height={15}
                            borderRadius={4}
                        />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        );
    };

    const RenderMajorFilter = item => {
        item = item.item;
        return (
            <TouchableOpacity
                key={item.id + rnd}
                activeOpacity={0.8}
                style={styles.filterButton}
                onPress={() => filterItemOnClickHandle(item.major_name)}>
                <Text
                    style={[
                        styles.textFilter,
                        majorFilter === item.major_name
                            ? {color: '#29b6f6'}
                            : null,
                    ]}>
                    {item.major_name}
                </Text>
                <Radio
                    selectedColor="#29b6f6"
                    style={styles.radioFilter}
                    selected={majorFilter === item.major_name}
                />
            </TouchableOpacity>
        );
    };

    const FilterRender = () => {
        return (
            <View>
                <FlatList
                    style={{paddingVertical: 5}}
                    data={listMajor.data}
                    renderItem={items => (
                        <RenderMajorFilter item={items.item} />
                    )}
                    key={item => item.id}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    };

    const searchHandle = () => {
        Keyboard.dismiss();
        const params =
            filter.city && filter.title && filter.work_type
                ? {
                      city: search,
                      title: search,
                      work_type: search,
                  }
                : filter.city && filter.title && !filter.work_type
                ? {
                      city: search,
                      title: search,
                  }
                : filter.city && !filter.title && !filter.work_type
                ? {
                      city: search,
                  }
                : filter.city && !filter.title && filter.work_type
                ? {
                      city: search,
                      work_type: search,
                  }
                : !filter.city && filter.title && filter.work_type
                ? {
                      title: search,
                      work_type: search,
                  }
                : !filter.city && !filter.title && filter.work_type
                ? {
                      work_type: search,
                  }
                : !filter.city && filter.title && !filter.work_type
                ? {
                      title: search,
                  }
                : {
                      city: search,
                  };
        setIsLoading(true);
        if (search !== '') setIsSearch(true);
        else setIsSearch(false);
        axios.post(API.SEARCH, params).then(response => {
            if (response.status === 200) {
                console.log(response.data);
            }
        });

        wait(1200).then(() => setIsLoading(false));
    };

    const onSearchTextChange = text => {
        setIsLoading(true);
        setSearch(text);
        const params =
            filter.city && filter.title && filter.work_type
                ? {
                      city: search,
                      title: search,
                      work_type: search,
                  }
                : filter.city && filter.title && !filter.work_type
                ? {
                      city: search,
                      title: search,
                  }
                : filter.city && !filter.title && !filter.work_type
                ? {
                      city: search,
                  }
                : filter.city && !filter.title && filter.work_type
                ? {
                      city: search,
                      work_type: search,
                  }
                : !filter.city && filter.title && filter.work_type
                ? {
                      title: search,
                      work_type: search,
                  }
                : !filter.city && !filter.title && filter.work_type
                ? {
                      work_type: search,
                  }
                : !filter.city && filter.title && !filter.work_type
                ? {
                      title: search,
                  }
                : {
                      city: search,
                  };
        if (text !== '') setIsSearch(true);
        else setIsSearch(false);
        axios.post(API.SEARCH, params).then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setSearchPost(response.data.data);
            }
        });

        wait(1200).then(() => setIsLoading(false));
    };

    const ShowEmpty = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.textEmpty}>Not found any items.</Text>
            </View>
        );
    };

    const RenderFilterWrapper = () => {
        return (
            <View style={styles.wrapperTab}>
                <Text>Search By: </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                        checked={filter.city}
                        onPress={() =>
                            setFilter({
                                city: !filter.city,
                                title: filter.title,
                                work_type: filter.work_type,
                            })
                        }
                        color="#666666"
                        style={{marginEnd: 15}}
                    />
                    <Text>City</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                        checked={filter.title}
                        onPress={() =>
                            setFilter({
                                city: filter.city,
                                title: !filter.title,
                                work_type: filter.work_type,
                            })
                        }
                        color="#666666"
                        style={{marginEnd: 15}}
                    />
                    <Text>Title</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                        checked={filter.work_type}
                        onPress={() =>
                            setFilter({
                                city: filter.city,
                                title: filter.title,
                                work_type: !filter.work_type,
                            })
                        }
                        color="#666666"
                        style={{marginEnd: 15}}
                    />
                    <Text>Type</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Menu" right onPressRight={() => onPopupHandle()} />

            <View style={styles.wrapperContent}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}>
                    <BlurBg />
                    <Search
                        onChangeText={text => onSearchTextChange(text)}
                        onPress={() => searchHandle()}
                        filterOnpress={() => onFilterClickHandle()}>
                        <RenderFilterWrapper />
                    </Search>
                    {!majorFilter && (
                        <TitleMore title="Popular Job" more="See all" />
                    )}
                    {!majorFilter && (
                        <FlatList
                            style={styles.flatlistViewHorizontal}
                            horizontal={true}
                            data={popularPost}
                            renderItem={items => {
                                return <PopularJobItem item={items.item} />;
                            }}
                            key={item => item.id}
                            keyExtractor={item => item.id}
                        />
                    )}
                    <TitleMore title="Recent Job" more="See all" />
                    {isLoading ? (
                        <LoadingSkeletionPlaceholder />
                    ) : majorFilter && isSearch ? (
                        recentPost !== null &&
                        recentPost.length > 0 &&
                        searchPost !== null &&
                        searchPost.length > 0 ? (
                            <FlatList
                                style={styles.flatlistViewVertical}
                                data={[...searchPost, ...recentPost]}
                                renderItem={items => {
                                    return <RecentJobItem item={items.item} />;
                                }}
                                key={item =>
                                    item.id +
                                    rnd +
                                    Math.round(Math.random(1) * 99999)
                                }
                                keyExtractor={item =>
                                    item.id +
                                    rnd +
                                    +Math.round(Math.random(1) * 99999)
                                }
                            />
                        ) : recentPost !== null && recentPost.length > 0 ? (
                            <FlatList
                                style={styles.flatlistViewVertical}
                                data={recentPost}
                                renderItem={items => {
                                    return <RecentJobItem item={items.item} />;
                                }}
                                key={item => item.id + rnd}
                                keyExtractor={item => item.id + rnd}
                            />
                        ) : searchPost !== null && searchPost.length > 0 ? (
                            <FlatList
                                style={styles.flatlistViewVertical}
                                data={recentPost}
                                renderItem={items => {
                                    return <RecentJobItem item={items.item} />;
                                }}
                                key={item => item.id + rnd}
                                keyExtractor={item => item.id + rnd}
                            />
                        ) : (
                            <ShowEmpty />
                        )
                    ) : majorFilter ? (
                        recentPost !== null && recentPost.length > 0 ? (
                            <FlatList
                                style={styles.flatlistViewVertical}
                                data={recentPost}
                                renderItem={items => {
                                    return <RecentJobItem item={items.item} />;
                                }}
                                key={item => item.id + rnd}
                                keyExtractor={item => item.id + rnd}
                            />
                        ) : (
                            <ShowEmpty />
                        )
                    ) : isSearch ? (
                        searchPost !== null && searchPost.length > 0 ? (
                            <FlatList
                                style={styles.flatlistViewVertical}
                                data={searchPost}
                                renderItem={items => {
                                    return <RecentJobItem item={items.item} />;
                                }}
                                key={item => item.id + rnd}
                                keyExtractor={item => item.id + rnd}
                            />
                        ) : (
                            <ShowEmpty />
                        )
                    ) : postData !== null && postData.length > 0 ? (
                        <FlatList
                            style={styles.flatlistViewVertical}
                            data={postData}
                            renderItem={items => {
                                return <RecentJobItem item={items.item} />;
                            }}
                            key={item => item.id + rnd}
                            keyExtractor={item => item.id + rnd}
                        />
                    ) : (
                        <ShowEmpty />
                    )}
                    <View style={styles.paddingBottomIOS}></View>
                </ScrollView>
            </View>
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
            <Animated.View style={[styles.wrapperFilter, {right: filterValue}]}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => onFilterClickHandle()}>
                        <Icon
                            name="arrow-right"
                            type="font-awesome-5"
                            size={24}
                            color="#666666"
                        />
                    </TouchableOpacity>
                    {listMajor !== null ? <FilterRender /> : null}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.filterButton}
                        onPress={() => setMajorFilter('')}>
                        <Text style={styles.textFilter}>Clear Filter</Text>
                        <Icon
                            name="times"
                            type="font-awesome-5"
                            size={24}
                            color="#666666"
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>
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
    wrapperFilter: {
        backgroundColor: 'rgba(255, 255, 255, .9)',
        position: 'absolute',
        top: Platform.OS === 'android' ? 75 : 125,
        right: -310,
        width: 300,
        height: '100%',
        zIndex: 100,
        padding: 10,
    },
    filterContainer: {
        justifyContent: 'flex-start',
        paddingVertical: 7,
    },
    closeButton: {
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    filterButton: {
        backgroundColor: '#f9f9f9',
        height: 40,
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingStart: 5,
        paddingEnd: 10,
        marginVertical: 5,
        borderRadius: 4,
        flexDirection: 'row',
    },
    textFilter: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
    },
    radioFilter: {},
    wrapperTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 50,
        height: 50,
        marginHorizontal: 10,
    },
    emptyContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textEmpty: {
        fontSize: 14,
        fontWeight: '600',
    },
});
