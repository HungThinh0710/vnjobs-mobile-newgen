import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    ApplyStackNavigator, 
    HomeStackNavigator, 
    MenuStackNavigator, 
    SettingStackNavigator 
} from './StackNavigator';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
        >
            <Tab.Screen name='Home' component={HomeStackNavigator} />
            <Tab.Screen name='Menu' component={MenuStackNavigator} />
            <Tab.Screen name='Apply' component={ApplyStackNavigator} />
            <Tab.Screen name='Setting' component={SettingStackNavigator} />
        </Tab.Navigator>
    )
}

const MenuTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Menu'
        >
            <Tab.Screen name='Home' component={HomeStackNavigator} />
            <Tab.Screen name='Menu' component={MenuStackNavigator} />
            <Tab.Screen name='Apply' component={ApplyStackNavigator} />
            <Tab.Screen name='Setting' component={SettingStackNavigator} />
        </Tab.Navigator>
    )
}

const ApplyTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Apply'
        >
            <Tab.Screen name='Home' component={HomeStackNavigator} />
            <Tab.Screen name='Menu' component={MenuStackNavigator} />
            <Tab.Screen name='Apply' component={ApplyStackNavigator} />
            <Tab.Screen name='Setting' component={SettingStackNavigator} />
        </Tab.Navigator>
    )
}

const SettingTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Setting'
        >
            <Tab.Screen name='Home' component={HomeStackNavigator} />
            <Tab.Screen name='Menu' component={MenuStackNavigator} />
            <Tab.Screen name='Apply' component={ApplyStackNavigator} />
            <Tab.Screen name='Setting' component={SettingStackNavigator} />
        </Tab.Navigator>
    )
}

export {
    HomeTabNavigator,
    MenuTabNavigator,
    ApplyTabNavigator,
    SettingTabNavigator
};