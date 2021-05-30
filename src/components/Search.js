import {CheckBox} from 'native-base';
import React from 'react';
import {
    StyleSheet,
    Text,
    Keyboard,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
const searchGlass = require('../../assets/images/001-magnifying-glass.png');
const filterIcon = require('../../assets/images/icons8-adjust.png');
import {Icon} from 'react-native-elements';
const Search = ({
    placeholder = null,
    onPress,
    filterOnpress,
    onChangeText,
    children,
}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container]}>
                <View style={[styles.wrapperSearch]}>
                    <View style={[styles.searchContent]}>
                        <TouchableOpacity
                            onPress={onPress}
                            style={[styles.searchIconView]}>
                            <Image
                                source={searchGlass}
                                style={[styles.searchIcon]}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={[styles.inputSearch, styles.shadow]}
                            placeholder={placeholder ? placeholder : 'Search'}
                            onSubmitEditing={onPress}
                            onChangeText={onChangeText}
                            // autoCorrect={false}
                            clearButtonMode="while-editing"
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.wrapperFilter, styles.shadowButton]}
                        onPress={filterOnpress}>
                        <Image source={filterIcon} style={[styles.filterBtn]} />
                    </TouchableOpacity>
                </View>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 2,
        minHeight: 120,
        maxHeight: 120,
    },
    wrapperSearch: {
        maxHeight: 70,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    searchContent: {
        flex: 4,
        flexDirection: 'row',
        paddingEnd: 15,
    },
    wrapperFilter: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EA5F72',
        maxWidth: 50,
        maxHeight: 50,
        width: 50,
        height: 50,
        marginVertical: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    inputSearch: {
        flex: 1,
        paddingLeft: Platform.OS === 'ios' ? 45 : 15,
        paddingEnd: 5,
        fontSize: 14,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        borderRadius: 16,
        zIndex: 2,
    },
    searchIconView: {
        width: 25,
        height: 25,
        minWidth: 25,
        minHeight: 25,
        position: 'absolute',
        left: 13,
        top: 13,
        zIndex: 999,
    },
    searchIcon: {
        width: 25,
        height: 25,
        zIndex: 20,
    },
    filterBtn: {
        width: 30,
        height: 30,
    },
    shadowButton: {
        shadowColor: '#EA5F72',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 4,
        shadowRadius: 5,
        shadowOpacity: 0.25,
    },
    shadow: {
        shadowColor: '#ededed',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 4,
        shadowRadius: 5,
        shadowOpacity: 0.79,
    },
});
