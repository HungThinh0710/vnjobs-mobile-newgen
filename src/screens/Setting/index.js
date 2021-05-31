import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import {ConfigButton, Header, SettingButton} from '../../components';
import {Icon} from 'react-native-elements';
import * as API from '../../api/Endpoints';
const AS = require('../../utilities/AsyncStorageHandler');
const axios = require('axios');

const Setting = ({navigation}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUserInformation(accessToken) {
            try {
                const payload = await axios.get(API.USER, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json; charset=utf-8',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log('Axios STT Code: ' + payload.status);
                if (payload.status === 200) {
                    setUser(payload.data);
                    console.log(payload.data);
                }
            } catch (error) {
                // console.error(error);
                setUser(null);
            }
        }

        async function checkToken() {
            const accessToken = await AS.getAccessToken();
            if (typeof accessToken !== 'undefined' || accessToken !== null) {
                getUserInformation(accessToken);
            }
        }
        checkToken();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Settings" />
            <View style={styles.wrapperContent}>
                <ScrollView>
                    {user !== null ? (
                        <SettingButton
                            right={
                                <Icon
                                    style={styles.rightIcon}
                                    name="edit"
                                    type="font-awesome-5"
                                    size={24}
                                    color="#ADE2FF"
                                />
                            }
                            onPress={() => {
                                navigation.push('Profile');
                            }}
                        />
                    ) : (
                        <SettingButton
                            title="Sign in"
                            left={
                                <Icon
                                    name="sign-in-alt"
                                    type="font-awesome-5"
                                    size={24}
                                />
                            }
                            onPress={() => navigation.navigate('Login')}
                        />
                    )}
                    <SettingButton
                        title="Notification"
                        left={
                            <Icon name="bell" type="font-awesome-5" size={24} />
                        }
                        right={
                            <Icon
                                name="wrench"
                                type="font-awesome-5"
                                size={24}
                                color="#6074F9"
                            />
                        }
                    />
                    <View style={styles.wrapperConfig}>
                        <ConfigButton />
                        <ConfigButton
                            style={{ backgroundColor: '#efefef' }}
                            textColor={{ color: '#000' }}
                            value={false}
                            title="Photos"
                            subTitle=""
                            icon={
                                <Icon
                                    name="images"
                                    type="font-awesome-5"
                                    size={25}
                                />
                            }
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Setting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    wrapperContent: {
        flex: 1,
        paddingTop: 15,
    },
    wrapperConfig: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});
