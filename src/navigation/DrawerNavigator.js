import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    HomeTabNavigator,
    MenuTabNavigator,
    ApplyTabNavigator,
    SettingTabNavigator
} from './TabNavigator';
import { LoginStackNavigator } from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
        >
            <Drawer.Screen name='Home' component={HomeTabNavigator} />
            <Drawer.Screen name='Menu' component={MenuTabNavigator} />
            <Drawer.Screen name='Apply' component={ApplyTabNavigator} />
            <Drawer.Screen name='Setting' component={SettingTabNavigator} />
            <Drawer.Screen name='Login' component={LoginStackNavigator} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;