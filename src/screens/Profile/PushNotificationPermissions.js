import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet, Platform} from 'react-native';
import SwitchUI from '../../components/UI/SwitchUI';
import {checkNotifications} from 'react-native-permissions';
import * as permissionsActions from '../../store/actions/permissions';
import {useDispatch, useSelector} from 'react-redux';

const PushNotificationPermissions = () => {

    const dispatch = useDispatch();
    const pushPermission = useSelector(state => state.permissions.pushNotificationPermissions);
    const key = useSelector(state => state.permissions.key);
    const category = 'pushPermission';


    const [isLoading, setIsLoading] = useState(false);
    const [isEnabledOrderStatus, setIsEnabledOrderStatus] = useState(true);
    const [isEnabledNews, setIsEnabledNews] = useState(false);
    const [isEnabledPromotion, setIsEnabledPromotion] = useState(false);
    const [permission, setPermission] = useState('');

    useEffect(() => {
        setIsLoading(true);
        pushPermission.filter(
            permission => {
                if (permission.title === 'orderStatus') {
                    setIsEnabledOrderStatus(permission.status)
                } else if (permission.title === 'news') {
                    setIsEnabledNews(permission.status)
                } else if (permission.title === 'promotion') {
                    setIsEnabledPromotion(permission.status)
                }
            }
        );
            checkNotifications().then(({status, settings}) => {
                console.log(status);
                console.warn(status);
            }).then(
                () => {
                    console.log('stop');
                }
            );
    }, []);

    const toggleSwitch = (enabled, setEnabled, value) => {
        setEnabled(previousState => !previousState);
        console.log(value);
        console.log(!enabled);

        dispatch(permissionsActions._changePermission(value, !enabled, category, key, value));
    }


    return(
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Text style={styles.header}>Powiadomienia PUSH</Text>
                <Text>{permission}</Text>
                <Text style={styles.header} onPress={() => {
                    Platform.OS === 'android' ?
                        console.warn(pushPermission)

                        : console.log(pushPermission)
                }}>Powiadomienia Email</Text>
                <SwitchUI
                    switchCondition={isEnabledOrderStatus}
                    onValueChange={() => toggleSwitch(isEnabledOrderStatus, setIsEnabledOrderStatus, 'orderStatus')}
                    value={isEnabledOrderStatus}
                    switchText={'Powiadomienia o statusie zamówienia'}
                />
                <SwitchUI
                    switchCondition={isEnabledNews}
                    onValueChange={() => toggleSwitch(isEnabledNews, setIsEnabledNews, 'news')}
                    value={isEnabledNews}
                    switchText={'Powiadomienia o nowościcach'}
                />
                <SwitchUI
                    switchCondition={isEnabledPromotion}
                    onValueChange={() => toggleSwitch(isEnabledPromotion, setIsEnabledPromotion, 'promotion')}
                    value={isEnabledPromotion}
                    switchText={'Powiadomienia o promocjach'}
                />
            </View>

        </View>
    )
}



export default PushNotificationPermissions;


const styles = StyleSheet.create({

    container: {
        margin: 20,
        marginTop: 30
    },

    header: {
        fontSize: 20,
        marginBottom: 20
    },

    admission: {
        // margin: 20,
        backgroundColor: 'white',
        padding: 25,
        textAlign: 'justify'
    },

    admissionText: {
        fontSize: 16
    },

    labelContainer: {
        marginTop: 30,
        margin: 30
    },

    switchContainer: {
        marginTop: 30
    }
});

