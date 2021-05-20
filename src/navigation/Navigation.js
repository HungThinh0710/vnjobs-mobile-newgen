import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import OnLoading from '../screens/OnLoading';

const Navigation = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function performTimeConsumingTask() {
            await new Promise(resolve =>
                setTimeout(() => {
                    resolve('result');
                }, 2000),
            );
        }
        const data = performTimeConsumingTask();
        if (data !== null) {
            setIsLoading(false);
        }
    }, []);
    if (isLoading) {
        return <OnLoading />;
    } else {
        return (
            <NavigationContainer>
                <DrawerNavigator />
            </NavigationContainer>
        );
    }
    
};

export default Navigation;
