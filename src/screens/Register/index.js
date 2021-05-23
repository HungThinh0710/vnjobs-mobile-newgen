import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputWithIcon, Loading } from '../../components'
import Icon from 'react-native-vector-icons/AntDesign';
const axios = require('axios');
import * as API from '../../api/Endpoints'
const AS = require('../../utilities/AsyncStorageHandler');

const imageBG = require('../../../assets/backgrounds/bg.jpg');
const logoImg = require('../../../assets/images/logo_official.png');

const Register = (props) => {
    const navigation = props.navigation;
    const [text, onChangeText] = useState('');
    const [pwd, onChangePwd] = useState('');
    const [cfrmPwd, onChangeCrfmPwd] = useState('');
    const [status, setStatus] = useState(true);
    const [msgError, setMsgError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [canLogin, setCanLogin] = useState(true);

    function register() {
        Keyboard.dismiss();
        setIsLoading(true);
        setStatus(true);
        if (pwd != cfrmPwd) {
            setIsLoading(false);
            setStatus(false);
            setMsgError('Password and confirm password are not match');
            return
        }
        axios.post(API.REGISTER, {
            email: text,
            password: pwd,
            first_name: 'User ',
            last_name: text
        })
            .then(async function (response) {
                console.log("LOGIN: SUCCESSFULLY");
                console.log(response.status);
                setIsLoading(false);
                if (response.status == 201) {
                    // await AS.storeAccessToken(response.data.access_token)
                    console.log(response.data);
                    axios.post(API.LOGIN, {
                        email: text,
                        password: pwd
                    })
                        .then(async function (responseLogin) {
                            console.log("LOGIN AFTER REGISTER: SUCCESSFULLY");
                            console.log(responseLogin.status);
                            setIsLoading(false);
                            if (responseLogin.status == 200) {
                                await AS.storeAccessToken(responseLogin.data.access_token)
                                navigation.navigate("Home")
                            }
                        })
                        .catch(function (error) {
                            console.log("LOGIN AFTER REGISTER: FAILED");
                            console.log(error.response);
                            // setIsLoading(false);
                            // setStatus(false);
                        });
                }

            })
            .catch(function (error) {
                console.log("SIGN UP: FAILED");
                // console.log(error);
                console.log(error.response.data.message);
                setIsLoading(false);
                setStatus(false);
                error.response.status == 422 ? setMsgError('Errors: ' + error.response.data.message) : setMsgError('Errors: Can not sign up.')
            });
    }

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         async function checkIsLogged() {
    //             const accessToken = await AS.getAccessToken();
    //             // console.log("Check current Access Token");
    //             if (typeof (accessToken) != 'undefined') {
    //                 const payload = await axios.get(API.LIST_APPLIED_JOBS, {
    //                     headers: {
    //                         Accept: 'application/json',
    //                         'Content-Type': 'application/json; charset=utf-8',
    //                         Authorization: `Bearer ${accessToken}`
    //                     }
    //                 });
    //                 // console.log("Axios STT Code: " + payload.status);
    //                 if (payload.status == 200) return navigation.navigate("Home");
    //             }
    //         }
    //         checkIsLogged();
    //     });

    //     return unsubscribe;

    // }, [navigation])

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground source={imageBG} style={styles.background}>
                {isLoading ? (<Loading msg="Sign up ..." authen={true} />) : null}
                {/* <Loading msg="Sign in ..." /> */}
                <View style={styles.context} >

                    <View style={styles.wrapLogo}>
                        <Image
                            style={styles.tinyLogo}
                            source={logoImg}
                        />
                    </View>
                    <Text style={styles.title}>Sign Up</Text>
                    {!status ? (
                        <Text style={styles.status}>{msgError}</Text>
                    ) : null}
                    <View style={styles.wrapContent}>
                        <TextInputWithIcon
                            icon
                            nameIcon='mail'
                            placeholder={'Email'}
                            onChangeText={t => onChangeText(t)}
                            typeIcon='AntDesign'
                            sizeIcon={22}
                            colorIcon='#666666' />
                        <TextInputWithIcon
                            icon
                            nameIcon='lock'
                            placeholder={'Password'}
                            onChangeText={pwd => onChangePwd(pwd)}
                            typeIcon='font-awesome-5'
                            sizeIcon={22}
                            colorIcon='#666666'
                            secureTextEntry={true} />
                        <TextInputWithIcon
                            icon
                            nameIcon='lock'
                            placeholder={'Confirm password'}
                            onChangeText={cfrmPwd => onChangeCrfmPwd(cfrmPwd)}
                            typeIcon='font-awesome-5'
                            sizeIcon={22}
                            colorIcon='#666666'
                            secureTextEntry={true} />
                        {canLogin ? (<View style={styles.loginWrapper}>
                            <Text style={{ paddingRight: 10, fontWeight: 'bold', fontSize: 18 }}>Sign up</Text>
                            <TouchableOpacity style={styles.loginButton}
                                onPress={() => register()}>
                                <Icon name="arrowright" size={30} color="white" />
                            </TouchableOpacity>
                        </View>) : null}

                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, paddingBottom: 10, paddingTop: 10 }}>OR</Text>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            backgroundColor: '#FE4442',
                            marginHorizontal: 20,
                            borderRadius: 45,
                            padding: 10,
                            justifyContent: 'center',
                        }}>
                            <Text style={{ flex: 1, backgroundColor: 'white', padding: 5, borderRadius: 20 }}>
                                <Icon name="google" size={30} color="red" />
                            </Text>

                            <Text style={{ flex: 9, textAlign: 'center', alignSelf: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>Sign up with Google</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Login") }}
                            style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                marginHorizontal: 20,
                                borderRadius: 45,
                                padding: 10,
                                justifyContent: 'center',
                                marginTop: 5,
                                borderColor: '#FE4442',
                                borderWidth: 1
                            }}>
                            <Text style={{ flex: 1, backgroundColor: 'red', padding: 5, borderRadius: 20, }}>
                                <Icon name="plus" size={30} color="white" />
                            </Text>

                            <Text style={{ flex: 9, textAlign: 'center', alignSelf: 'center', color: '#FE4442', fontSize: 16, fontWeight: 'bold' }}>Sign in</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback >
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 21,
        textTransform: 'uppercase',
    },
    status: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        fontSize: 18,
        color: '#EA5F72',
    },
    context: {
        justifyContent: 'center'
    },
    wrapLogo: {
        alignItems: 'center',
    },
    tinyLogo: {
        backgroundColor: '#FFF',
        borderRadius: 40,
        width: 150,
        height: 150
    },
    wrapContent: {
        marginHorizontal: 10,
    },
    loginWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    loginButton: {
        backgroundColor: '#29DBA0',
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 20
    }
})
