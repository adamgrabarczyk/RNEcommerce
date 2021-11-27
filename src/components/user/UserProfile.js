import { StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserAvatarPicker from '../../components/user/UserAvatarPicker';
import AsyncStorage from "@react-native-async-storage/async-storage";


const UserProfile = (props) => {

    const [userName, setUserName] = useState();

    useEffect(() => {
        const getUserData = async () => {
            const authData = await AsyncStorage.getItem('authData');
            const parseAuthData = JSON.parse(authData);
            setUserName(parseAuthData.name);
        }
        getUserData();
    });

    return (
        <View style={styles.container}>
            <View>
            <Text>Cześć {userName}!</Text>
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
        margin: 80
    }

});


