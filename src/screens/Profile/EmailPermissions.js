import React, {useEffect, useState} from 'react';
import {View,  Text, StyleSheet} from 'react-native';
import SwitchUI from '../../components/UI/SwitchUI';
import {useDispatch, useSelector} from 'react-redux';
import * as permissionsActions from '../../store/actions/permissions';

const EmailPermissions = () => {
    const dispatch = useDispatch();
    const emailPermission = useSelector(state => state.permissions.emailPermissions);
    const key = useSelector(state => state.permissions.key);
    const category = 'emailPermission';

    const toggleSwitch = (enabled, setEnabled, value) => {
        setEnabled(previousState => !previousState);
        console.log(value);
        console.log(!enabled);

        dispatch(permissionsActions._changePermission(value, !enabled, category, key, value));
        // dispatch(permissionsActions._setPermission(value, !enabled));
    }

    useEffect(() => {

        emailPermission.filter(
            permission => {
                if (permission.title === 'orderStatus') {
                    setIsEnabledOrderStatus(permission.status)
                } else if (permission.title === 'news') {
                    setIsEnabledNews(permission.status)
                } else if (permission.title === 'promotion') {
                    setIsEnabledPromotion(permission.status)
                } else if (permission.title === 'changes') {
                    setIsEnabledChanges(permission.status)
                }
            }
        )

    }, []);


    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledOrderStatus, setIsEnabledOrderStatus] = useState(true);
    const [isEnabledNews, setIsEnabledNews] = useState(false);
    const [isEnabledPromotion, setIsEnabledPromotion] = useState(false);
    const [isEnabledChanges, setIsEnabledChanges] = useState(false);




    return(
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Text style={styles.header} onPress={() => console.log(emailPermission)}>Powiadomienia Email</Text>
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
                <SwitchUI
                    switchCondition={isEnabledChanges}
                    onValueChange={() => toggleSwitch(isEnabledChanges, setIsEnabledChanges, 'changes')}
                    value={isEnabledChanges}
                    switchText={'Powiadomienia o zmianach na koncie'}
                />
            </View>
        </View>
    )
}



export default EmailPermissions;

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

