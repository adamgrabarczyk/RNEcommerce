import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ManageOption = (props) => {


    return (
        <View style={styles.manageOptionContainer}>
            {

                <Pressable
                    onPress={props.setMangeAddress}
                    style={styles.manageOptionButton}
                >
                     <Ionicons
                            name={Platform.OS === 'android' ? 'options' : 'ios-options'}
                            size={25}
                            color={Colors.primary}
                            style={styles.manageOptionButtonIcon}
                        />

                    <Text style={styles.manageOptionButtonText}>{props.manageAddress === false ? 'Zarządzaj adresami' : 'Zakończ'}</Text>
                </Pressable>
            }
        </View>
    );
};

export default ManageOption;

const styles = StyleSheet.create({

    manageOptionContainer: {
        width: '100%',
        height: 35,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ededed'
    },

    manageOptionButton: {
        flexDirection: 'row',
        width: '40%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    manageOptionButtonText: {
        width: '80%',
        marginRight: -15,
        marginBottom: 5
    },

    manageOptionButtonIcon: {
        width: '20%'
    }
});


