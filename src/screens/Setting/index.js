import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { ConfigButton, Header, SettingButton } from '../../components';
import { Icon } from 'react-native-elements';

const Setting = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Settings" />
            <View style={styles.wrapperContent}>
                <ScrollView>
                    <SettingButton onPress={() => {
                        navigation.navigate("Profile");
                    }} />
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
                            title='Photos'
                            subTitle=''
                            icon={<Icon name='images' type='font-awesome-5' size={25} />}
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
        marginTop: 20
    },
});
