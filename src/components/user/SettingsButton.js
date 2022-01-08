import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';

const SettingsButton = (props) => {


    return (
                <View style={props.disabled === true ? styles.accountSettingsHandleContainerDisabled : [styles.accountSettingsHandleContainer, props.accountSettingsHandleContainerWithDelete]}>
                    <TouchableOpacity style={styles.accountSettingsHandle}
                        onPress={props.settingsActionButton}
                                          disabled={props.disabled}
                        >
                            <View>
                                <Text style={styles.accountSettingsHandleText}>{props.accountSettingsHandleText}</Text>
                                <Text style={styles.accountSettingsHandleTip}>{props.accountSettingsHandleTip}</Text>
                            </View>
                            <Text style={styles.accountSettingsHandlePress}>{props.accountSettingsHandlePress}</Text>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={props.delete} style={props.deleteStyle}>{props.deleteContnet}</TouchableOpacity>
                </View>
    );
}

export default SettingsButton;

const styles = StyleSheet.create({

    accountSettingsHandleContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    accountSettingsHandleContainerDisabled: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        opacity: 0.4
    },
    accountSettingsHandle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15
    },
    accountSettingsHandleText: {
        color: 'grey',
        fontSize: 20,
        marginBottom: 3
    },
    accountSettingsHandleTip: {
        fontSize: 12,
        color: 'grey',
    },
    accountSettingsHandlePress: {
        marginTop: 10,
        fontSize: 17,
        color: Colors.primary,
    }
});


