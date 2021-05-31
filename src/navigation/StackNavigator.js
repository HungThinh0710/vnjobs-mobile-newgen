import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Apply from '../screens/Apply';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Menu from '../screens/Menu';
import Register from '../screens/Register';
import Setting from '../screens/Setting';
import Profile from '../screens/Profile';
import JobDetail from '../screens/JobDetail';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="JobDetail" component={JobDetail} />
        </Stack.Navigator>
    );
};

const ApplyStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Apply" headerMode="none">
            <Stack.Screen name="Apply" component={Apply} />
        </Stack.Navigator>
    );
};

const MenuStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Menu" headerMode="none">
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="JobDetail" component={JobDetail} />
        </Stack.Navigator>
    );
};

const SettingStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Setting" headerMode="none">
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
};

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" headerMode="none">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" headerMode="none">
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
};

export {
    HomeStackNavigator,
    ApplyStackNavigator,
    MenuStackNavigator,
    SettingStackNavigator,
    LoginStackNavigator,
    ProfileStackNavigator,
};
