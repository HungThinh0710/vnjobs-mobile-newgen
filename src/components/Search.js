import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
const searchGlass = require('../../assets/images/001-magnifying-glass.png');
const filterIcon = require('../../assets/images/icons8-adjust.png');

const Search = ({placeholder, onPress}) => {
    return (
        <View style={[styles.container]}>
            <View style={[styles.wrapperSearch]}>
                <View style={[styles.searchContent]}>
                    <TextInput
                        style={[styles.inputSearch]}
                        placeholder={
                            placeholder ? placeholder : 'Search'
                        }></TextInput>
                    <Image source={searchGlass} style={[styles.searchIcon]} />
                </View>
                <TouchableOpacity style={[styles.wrapperFilter]}>
                    <Image source={filterIcon} style={[styles.filterBtn]} />
                </TouchableOpacity>
            </View>
            <View style={styles.wrapperFilter}></View>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    searchIcon: {
        width: 25,
        height: 25,
    },
    filterBtn: {
        width: 30,
        height: 30,
    },
});
