import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
    ApplyStackNavigator,
    HomeStackNavigator,
    MenuStackNavigator,
    SettingStackNavigator,
} from './StackNavigator';
const home = require('../../assets/images/001-home.png');
const homeActive = require('../../assets/images/002-home-1.png');
const menu = require('../../assets/images/001-grid.png');
const menuActive = require('../../assets/images/002-menu.png');
const apply = require('../../assets/images/003-book.png');
const applyActive = require('../../assets/images/004-book.png');
const setting = require('../../assets/images/001-setting.png');
const settingActive = require('../../assets/images/002-settings.png');

const Tab = createBottomTabNavigator();

const shadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: -1,
        height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: Platform.OS === 'ios' ? 3.5 : 5,
    elevation: Platform.OS === 'ios' ? 3 : 5,
};

const tabBarOptions = {
    showLabel: false,
    style: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 15 : 10,
        left: 10,
        right: 10,
        elevation: 0,
        height: 95,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingBottom: 15,
        paddingHorizontal: 17,
        ...shadow,
    },
    tabStyle: {
        top: Platform.OS === 'ios' ? 20 : 5,
    },
};

const TabIcon = ({focused, name = 'Home'}) => {
    return (
        <View style={[styles.tabView, focused ? styles.bgFocused : '']}>
            {name === 'Home' ? (
                <View style={styles.viewBagsub}>
                    <Image
                        style={styles.tabIcon}
                        source={focused ? homeActive : home}
                    />
                    {focused && <Text style={styles.textColor}>Home</Text>}
                </View>
            ) : name === 'Menu' ? (
                <View style={styles.viewBagsub}>
                    <Image
                        style={styles.tabIcon}
                        source={focused ? menuActive : menu}
                    />
                    {focused && <Text style={styles.textColor}>Menu</Text>}
                </View>
            ) : name === 'Apply' ? (
                <View style={styles.viewBagsub}>
                    <Image
                        style={styles.tabIcon}
                        source={focused ? applyActive : apply}
                    />
                    {focused && <Text style={styles.textColor}>Applied</Text>}
                </View>
            ) : (
                <View style={styles.viewBagsub}>
                    <Image
                        style={styles.tabIcon}
                        source={focused ? settingActive : setting}
                    />
                    {focused && <Text style={styles.textColor}>Settings</Text>}
                </View>
            )}
        </View>
    );
};

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Home" />;
                    },
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Menu" />;
                    },
                }}
            />
            <Tab.Screen
                name="Apply"
                component={ApplyStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Apply" />;
                    },
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Setting" />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const MenuTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Menu" tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Home" />;
                    },
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Menu" />;
                    },
                }}
            />
            <Tab.Screen
                name="Apply"
                component={ApplyStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Apply" />;
                    },
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Setting" />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const ApplyTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Apply" tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Home" />;
                    },
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Menu" />;
                    },
                }}
            />
            <Tab.Screen
                name="Apply"
                component={ApplyStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Apply" />;
                    },
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Setting" />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const SettingTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Setting" tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Home" />;
                    },
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Menu" />;
                    },
                }}
            />
            <Tab.Screen
                name="Apply"
                component={ApplyStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Apply" />;
                    },
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingStackNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return <TabIcon focused={focused} name="Setting" />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export {
    HomeTabNavigator,
    MenuTabNavigator,
    ApplyTabNavigator,
    SettingTabNavigator,
};

const styles = StyleSheet.create({
    tabView: {
        width: 80,
        height: 80,
        alignItems: 'center',
    },
    tabIcon: {
        width: 25,
        height: 25,
    },
    viewBagsub: {
        alignItems: 'center',
    },
    textColor: {
        fontSize: 10,
        color: '#3D7DFF',
        fontWeight: '500',
        marginTop: 6
    },
});
