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
} from 'react-native';
const searchGlass = require('../../assets/images/001-magnifying-glass.png');
const filterIcon = require('../../assets/images/icons8-adjust.png');

const Search = ({placeholder = null, onPress}) => {
    const searchHandle = () => {
        Keyboard.dismiss;
        onPress;
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container]}>
                <View style={[styles.wrapperSearch]}>
                    <View style={[styles.searchContent]}>
                        <TextInput
                            style={[styles.inputSearch, styles.shadow]}
                            placeholder={placeholder ? placeholder : 'Search'}
                            onSubmitEditing={() => searchHandle()}
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                        />
                        <TouchableOpacity
                            onPress={() => searchHandle()}
                            style={[styles.searchIconView]}
                            accessible={false}>
                            <Image
                                source={searchGlass}
                                style={[styles.searchIcon]}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[styles.wrapperFilter, styles.shadowButton]}>
                        <Image source={filterIcon} style={[styles.filterBtn]} />
                    </TouchableOpacity>
                </View>
                <View style={styles.wrapperTab}></View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingLeft: 45,
        paddingEnd: 5,
        fontSize: 14,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        borderRadius: 16,
    },
    searchIconView: {
        width: 25,
        height: 25,
        position: 'absolute',
        left: 13,
        top: 13,
    },
    searchIcon: {
        width: 25,
        height: 25,
    },
    filterBtn: {
        width: 30,
        height: 30,
    },
    shadowButton: {
        shadowColor: 'rgba(234, 95, 114, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 5,
        shadowOpacity: 0.79,
    },
    shadow: {
        shadowColor: 'rgba(237, 237, 237, 0.79)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.79,
    },
    wrapperTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 50,
        height: 50,
        marginHorizontal: 10,
    },
});
