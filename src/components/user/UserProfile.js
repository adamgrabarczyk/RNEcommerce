import { StyleSheet, View, Text} from 'react-native';
import React from 'react';
import UserAvatarPicker from '../../components/user/UserAvatarPicker';
import {useSelector} from 'react-redux';


const UserProfile = (props) => {
    const userName = useSelector(state => state.auth.userName);
    const userSurname = useSelector(state => state.auth.userSurname);

    return (
        <View style={styles.container}>
            <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userName}>{userSurname}</Text>
            </View>
            <View>
                <UserAvatarPicker/>
            </View>
            </View>
    );
}

export default UserProfile;
const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 50
    },
    userNameContainer: {

    },

    userName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'grey'
    }

});


