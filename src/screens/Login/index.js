import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInputWithIcon } from '../../components'
import Icon from 'react-native-vector-icons/AntDesign';

const imageBG = require('../../../assets/backgrounds/bg.jpg');
const logoImg = require('../../../assets/images/logo_official.png');

const Login = () => {
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground source={imageBG} style={styles.background}>
                <View style={styles.context} >
                    <View style={styles.wrapLogo}>
                        <Image
                            style={styles.tinyLogo}
                            source={logoImg}
                        />
                    </View>
                    <Text style={styles.title}>Sign in with your account</Text>
                    <View style={styles.wrapContent}>
                        <TextInputWithIcon />
                        <TextInputWithIcon />
                        <View style={styles.loginWrapper}>
                            <Text style={{ paddingRight: 10, fontWeight: 'bold', fontSize: 18 }}>Signin</Text>
                            <TouchableOpacity style={styles.loginButton}>
                                <Icon name="arrowright" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, paddingBottom: 10 }}>OR</Text>
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

                            <Text style={{ flex: 9, textAlign: 'center', alignSelf: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login with Google</Text>

                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', color: "#7C8A97", fontSize: 16, paddingTop: 10 }}>Do not have an account? <Text style={{ color: "#66AFFF", fontWeight: 'bold' }}>Sign Up</Text></Text>

                    </View>
                </View>
            </ImageBackground>

        </TouchableWithoutFeedback >
    )
}

export default Login

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
        fontSize: 16
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
