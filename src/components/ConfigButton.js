import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon, Switch } from 'react-native-elements'

const ConfigButton = ({style, value = true, switchOnPress, iconColor = '#666', icon, textColor, onPress, title = 'Security', subTitle = '8 characters'}) => {
    return (
        <TouchableOpacity style={[styles.container, styles.shadow, style]} activeOpacity={.8} onPress={onPress} >
            <View style={styles.topContent}>
                <View style={styles.topLeftContent}>
                    <View style={styles.borderIcon}>
                        {icon ? icon : <Icon size={25} name='lock' type='font-awesome-5' color='#666' /> }
                    </View>
                </View>
                <View style={styles.topRightContent}>
                    <Switch value={value} />
                </View>
            </View>
            <View style={styles.bottomContent}>
                <View style={styles.topBottomContent}>
                    <Text style={[styles.texttb, textColor]}>{title}</Text>
                </View>
                <View style={styles.bottomBottomContent}>
                    <Text style={[styles.textbb, textColor]}>{subTitle}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ConfigButton

const styles = StyleSheet.create({
    container: {
        maxWidth: 160,
        width: 160, 
        height: 160,
        marginVertical: 10, 
        marginHorizontal: 10,
        borderRadius: 16,
        padding: 10,
        backgroundColor: '#000'   
    },
    shadow: {
        shadowColor: '#9c9c9c',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
        shadowRadius: 3,
        shadowOpacity: 0.79,
    },
    topContent: {
        flex: 1,
        flexDirection: 'row',
    },
    topLeftContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    borderIcon: {
        width: 45,
        height: 45,
        padding: 3,
        borderRadius: 6,
        borderColor: '#666',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topRightContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContent: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: 15
    },
    texttb: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    textbb: {
        color: '#dfdfdf',
        fontSize: 12,
    },

})
