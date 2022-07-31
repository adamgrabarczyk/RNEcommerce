import { ScrollView, View,  Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import CartStepHeader from '../../components/UI/CartStepHeader';
import EmailPermissions from './EmailPermissions';
import PushNotificationPermissions from './PushNotificationPermissions';
import Colors from '../../constans/Colors';

const Tab = createMaterialTopTabNavigator();

const Permissions = () => {

    const userName = useSelector(state => state.auth.userName);

    useEffect(() => {

    }, []);

    return (
        <ScrollView style={styles.container}>
            <CartStepHeader headerText={'Zgody na powiadomienia'}/>
        <View style={styles.admission}>
            <Text style={styles.admissionText}>{userName}, uważamy że warto być na bierząco ze wszystkimi informacjami i nowościami. Dlatego dajemy Ci możliwość bycia blisko nas i naszych produktów. Wybierz opcje, które będą do Ciebie najlepiej dopasowane.</Text>
        </View>
            <View style={styles.labelContainer}>
                <Tab.Navigator>
                    <Tab.Screen name="EMAIL" component={EmailPermissions} />
                    <Tab.Screen name="PUSH" component={PushNotificationPermissions} />
                </Tab.Navigator>
            </View>
        </ScrollView>
    );
}

export default Permissions;

const styles = StyleSheet.create({

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
        // marginTop: 30,
        // margin: 30,
        width: '100%',
        borderTopWidth: 1,
        borderBottomColor: Colors.primary
    },

    switchContainer: {
        marginTop: 30
    }
});


