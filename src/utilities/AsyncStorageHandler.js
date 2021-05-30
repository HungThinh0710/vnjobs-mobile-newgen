import AsyncStorage from '@react-native-async-storage/async-storage';

exports.storeAccessToken = async (value) => {
    try {
        await AsyncStorage.setItem('@token', value)
    } catch (e) {
        // saving error
    }
}

exports.getAccessToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@token')
        if (value !== null) {
            // value previously stored
            return value
        }
    } catch (e) {
        // error reading value
    }
}

exports.clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }

    console.log('Done.')
}
