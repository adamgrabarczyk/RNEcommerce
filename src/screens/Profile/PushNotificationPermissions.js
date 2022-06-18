import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import SwitchUI from '../../components/UI/SwitchUI';
import {checkNotifications, openSettings} from 'react-native-permissions';
import * as permissionsActions from '../../store/actions/permissions';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constans/Colors';
import Spinner from '../../components/UI/Spinner';

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
            checkNotifications().then(({status, settings}) => {
                setPermission(status)
            }).then(
                () => {
                    console.log('stop');
                    setIsLoading(false);
                }
            );
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

    }, []);

    const toggleSwitch = (enabled, setEnabled, value) => {
        setEnabled(previousState => !previousState);
        console.log(value);
        console.log(!enabled);

        dispatch(permissionsActions._changePermission(value, !enabled, category, key, value));
    }



    if (permission === 'blocked') {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                <Text style={styles.wrapperText}>Nie wyrażono zgody na otrzymywanie powiadomień push</Text>
                <TouchableOpacity style={styles.settingsButton}
                    onPress={() => openSettings()}>
                    <Text style={styles.settingsButtonText}>Zmień ustawienia</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    if (isLoading) {
        return <Spinner spinnerSize='fullScreen'/>
    }

    return(
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Text style={styles.header}>Powiadomienia PUSH</Text>
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
    },

    wrapper : {
        textAlign: 'center',
        alignItems: 'center'
    },

    wrapperText: {
        fontSize: 18,
        margin: 10
    },

    settingsButton: {
        marginTop: 100,
        padding: 15,
        backgroundColor: Colors.primary
    },

    settingsButtonText: {
        color: 'white',
        fontSize: 16
    }
});

