import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Image,
    Keyboard,
    TouchableOpacity,
    LogBox
} from 'react-native';
import {Header} from '../../components/index';
import * as API from '../../api/Endpoints';
import {FlatList} from 'react-native';
import {TextInput} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Icon} from 'react-native-elements';
import {Dimensions} from 'react-native';
const AS = require('../../utilities/AsyncStorageHandler');
const companyLogoDefault = require('../../../assets/images/google.png');
const axios = require('axios');
const windowWidth = Dimensions.get('window').width + 10;
LogBox.ignoreAllLogs();
const index = ({navigation, route}) => {
    const {item} = route.params;
    const [timeleft, setTimeleft] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [relatedJob, setRelatedJob] = useState(null);
    const [apply, setApply] = useState(false);
    const [cv, setCv] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [yearExp, setYearExp] = useState('0');
    const [isApply, setIsApply] = useState(false);
    const slideInValue = useRef(new Animated.Value(windowWidth)).current;

    const slideIn = () => {
        Animated.timing(slideInValue, {
            toValue: 0,
            duration: 700,
            useNativeDriver: false,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(slideInValue, {
            toValue: windowWidth,
            duration: 700,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
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
        setTimeleft(
            ld > 1
                ? ld + ' days left'
                : ld === 1
                ? ld + ' day left'
                : 'Expired',
        );

        async function getCompanyName() {
            try {
                const response = await axios.get(
                    API.LIST_ORGANIZATION + '/find-by-id/' + item.org_id,
                );
                if (response.status === 200)
                    setCompanyName(response.data.org_name);
            } catch (error) {
                console.log(error);
            }
            
        }

        async function getRelateJob() {
            axios
                .get(API.LIST_RECRUITMENT_NEWS_SORT_BY_MAJOR)
                .then(response => {
                    if (response.status === 200) {
                        if (response.data) {
                            response.data.forEach(e => {
                                if (e.major_name === item.major.major_name) {
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
                                            interview_end_time:
                                                er.interview_end_time,
                                            created_at: er.created_at,
                                            updated_at: er.updated_at,
                                            major: {
                                                major_name: majorName,
                                            },
                                        };
                                        erTemp.push(rn);
                                    });
                                    setRelatedJob(erTemp);
                                }
                            });
                        }
                    }
                });
        }
        async function checkApplied() {
            const accessToken = await AS.getAccessToken();
            if (typeof accessToken !== 'undefined' || accessToken !== null) {
                try {
                    const payload = await axios.get(API.LIST_APPLIED_JOBS, {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json; charset=utf-8',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (payload.status == 200) {
                        payload.data.map((e, i) => {
                            console.log(e);
                            if (e.rn_id === item.id) {
                                setApply(true);
                            }
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getCompanyName();
        checkApplied();
        getRelateJob();
    }, []);

    const applyJob = async () => {
        const accessToken = await AS.getAccessToken();
        if (typeof accessToken !== 'undefined' || accessToken !== null) {
            const data = JSON.stringify({
                rn_id: item.id,
                cv_path: cv,
                cover_letter_path: coverLetter,
                exp_years: yearExp,
            });
            try {
                const formdata = new FormData();
                formdata.append('rn_id', item.id);
                formdata.append('exp_years', yearExp);
                formdata.append('cover_letter_path', coverLetter);
                formdata.append('cv_path', cv);
                console.log('FORM DATA');
                console.log(formdata);
                const response = await axios.post(API.APPLY, formdata, {
                    headers: {
                        'Content-Type': `multipart/form-data`,
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setApply(true);
                    slideOut();
                } else if (response.status === 201) {
                    setApply(true);
                    slideOut();
                } else if (response.status === 401) {
                    navigation.navigate('Login');
                }
            } catch (error) {
                if (error === 'Error: Request failed with status code 401') {
                    navigation.navigate('Login');
                }
                console.log(error);
            }
        } else {
            navigation.navigate('Login');
        }
    };

    const chooseCv = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            const tempRes = {
                uri: res.uri,
                name: res.name,
                size: res.size,
                type: res.type,
            };
            setCv(tempRes); //here
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    };

    const chooseCoverLetter = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            const tempRes = {
                uri: res.uri,
                name: res.name,
                size: res.size,
                type: res.type,
            };
            setCoverLetter(tempRes);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title={item.title}
                left
                onPressLeft={() => navigation.goBack()}
            />
            <View style={styles.wrapperContent}>
                <ScrollView
                    style={styles.scrollView}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.topWrapper}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.titleText}>{item.title}</Text>
                        </View>
                        <View style={styles.sworktypeWrapper}>
                            <Text style={styles.salaryText}>Negotiable</Text>
                            <Text style={styles.workTypeText}>
                                {item.work_type}
                            </Text>
                            <Text style={styles.majorText}>
                                {item.major.major_name}
                            </Text>
                        </View>
                        <View style={styles.cityWrapper}>
                            <Text style={styles.cityText}>{item.city}</Text>
                        </View>
                        <View style={styles.timeleftWrapper}>
                            <Text
                                style={
                                    (styles.timeleftText,
                                    timeleft === 'Expired'
                                        ? {color: 'red'}
                                        : null)
                                }>
                                {timeleft}
                            </Text>
                        </View>
                        <View style={styles.applyWrapper}>
                            <TouchableOpacity
                                disabled={apply}
                                style={[
                                    styles.applyButton,
                                    apply ? {backgroundColor: '#ffbd45'} : null,
                                ]}
                                activeOpacity={0.7}
                                onPress={() => slideIn()}>
                                <Text style={styles.applyText}>
                                    {apply ? 'Applied' : 'Apply'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.companyWrapper}>
                        <Image
                            style={styles.companyLogo}
                            source={companyLogoDefault}
                            width={30}
                            height={30}
                        />
                        <Text style={styles.companyText}>{companyName}</Text>
                    </View>

                    <View style={styles.contentWrapper}>
                        <View style={styles.jobDescriptionWrapper}>
                            <Text style={styles.titleJobDescriptionText}>
                                Job Description
                            </Text>
                            <Text style={styles.detailJDText}>
                                {item.content}
                            </Text>
                        </View>
                        <View style={styles.locationWrapper}>
                            <Text style={styles.locationTitleText}>
                                Job Location
                            </Text>
                            <Text style={styles.locationText}>
                                {item.address}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.relateJobWrapper}>
                        <Text style={styles.relateText}>Related Jobs</Text>
                        {relatedJob !== null ? (
                            relatedJob.length > 0 ? (
                                <FlatList
                                    style={styles.flatlistViewVertical}
                                    data={relatedJob}
                                    renderItem={items => {
                                        return (
                                            <RecentJobItem
                                                item={items.item}
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'JobDetail',
                                                        {item: items.item},
                                                    )
                                                }
                                            />
                                        );
                                    }}
                                    key={item => item.id + rnd}
                                    keyExtractor={item => item.id + rnd}
                                />
                            ) : (
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: '600',
                                    }}>
                                    Not found related jobs.
                                </Text>
                            )
                        ) : (
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontWeight: '600',
                                }}>
                                Not found related jobs.
                            </Text>
                        )}
                    </View>
                </ScrollView>
                <TouchableWithoutFeedback
                    onPress={() => Keyboard.dismiss()}
                    style={styles.chooseFile}>
                    <Animated.View
                        style={[styles.chooseFile, {left: slideInValue}]}>
                        <View style={styles.rowChooseFile}>
                            <Text style={styles.textRow}>Enter year exp:</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setYearExp(text)}
                                text={yearExp}
                            />
                        </View>
                        <View style={styles.rowChooseFile}>
                            <Text style={styles.textRow}>Choose CV:</Text>
                            <TouchableOpacity
                                style={styles.btnChooseFile}
                                onPress={() => chooseCv()}>
                                <Text style={styles.chooseText}>
                                    Chose File
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.showContentWrapper}>
                            <Text style={styles.contentText}>
                                CV path: {cv.name}
                            </Text>
                        </View>
                        <View style={styles.rowChooseFile}>
                            <Text style={styles.textRow}>
                                Choose cover letter:
                            </Text>
                            <TouchableOpacity
                                style={styles.btnChooseFile}
                                onPress={() => chooseCoverLetter()}>
                                <Text style={styles.chooseText}>
                                    Chose File
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.showContentWrapper}>
                            <Text style={styles.contentText}>
                                Cover letter path: {coverLetter.name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.applyAllButton}
                            onPress={() => applyJob()}>
                            <Text style={styles.applyAllText}>Apply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => slideOut()}>
                            <Icon
                                name="times"
                                type="font-awesome-5"
                                size={25}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingBottom: Platform.OS === 'android' ? 107 : 0,
    },
    wrapperContent: {
        flex: 1,
    },
    scrollView: {},
    topWrapper: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#c9c9c9',
    },
    titleWrapper: {
        flex: 1,
        height: 45,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sworktypeWrapper: {
        flex: 1,
        height: 35,
        alignItems: 'center',
        flexDirection: 'row',
    },
    salaryText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fb8c00',
    },
    workTypeText: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginHorizontal: 12,
        borderRadius: 7,
        backgroundColor: '#e9e9e9',
    },
    majorText: {
        fontWeight: 'bold',
        marginHorizontal: 12,
    },
    cityWrapper: {
        flex: 1,
        justifyContent: 'center',
        height: 30,
    },
    cityText: {
        color: '#666666',
        fontSize: 14,
    },
    timeleftWrapper: {
        flex: 1,
        justifyContent: 'center',
        height: 30,
    },
    timeleftText: {
        fontSize: 12,
        color: '#666666',
    },
    applyWrapper: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
    },
    applyButton: {
        paddingHorizontal: 35,
        paddingVertical: 10,
        backgroundColor: '#fb8c00',
        borderRadius: 6,
    },
    applyText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    companyWrapper: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 18,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#c9c9c9',
        flexDirection: 'row',
        alignItems: 'center',
    },
    companyLogo: {
        marginRight: 12,
    },
    companyText: {
        fontWeight: '600',
        color: '#444444',
        fontSize: 18,
    },
    contentWrapper: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#c9c9c9',
    },
    jobDescriptionWrapper: {
        paddingBottom: 12,
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
    },
    titleJobDescriptionText: {
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 8,
    },
    detailJDText: {
        color: '#333333',
    },
    locationWrapper: {
        paddingTop: 12,
    },
    locationTitleText: {
        fontWeight: '600',
        fontSize: 16,
        paddingBottom: 8,
    },
    locationText: {
        color: '#333333',
    },
    relateJobWrapper: {
        backgroundColor: '#ffffff',
        padding: 10,
    },
    relateText: {
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 8,
    },
    chooseFile: {
        position: 'absolute',
        top: 0,
        left: windowWidth,
        bottom: 0,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 55,
        backgroundColor: 'rgba(255, 255, 255, .95)',
    },
    rowChooseFile: {
        flex: 1,
        maxHeight: 40,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textRow: {},
    textInput: {
        backgroundColor: '#ffffff',
        flex: 1,
        height: 30,
        marginLeft: 12,
        padding: 5,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#e9e9e9',
    },
    btnChooseFile: {
        marginLeft: 12,
        paddingHorizontal: 18,
        paddingVertical: 6,
        backgroundColor: '#e7e7e7',
        borderRadius: 6,
    },
    chooseText: {
        fontSize: 14,
    },
    showContentWrapper: {
        paddingVertical: 7,
    },
    contentText: {
        fontSize: 14,
    },
    applyAllButton: {
        paddingHorizontal: 55,
        paddingVertical: 8,
        alignSelf: 'center',
        backgroundColor: '#7cb342',
        borderRadius: 4,
    },
    applyAllText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    closeButton: {
        position: 'absolute',
        zIndex: 5,
        left: 10,
    },
});
