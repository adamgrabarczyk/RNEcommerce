import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ActionButton from '../../components/UI/ActionButton';
import CartStepHeader from '../../components/UI/CartStepHeader';

import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';



const SuccessScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.noOrdersTextContainer}>
                    <View style={styles.paymentMethodSection}>
                        <CartStepHeader headerText={'Potwierdzenie złożenia zamówienia'}/>
                        <View style={styles.contentSuccess}>
                        <Ionicons
                            name={'md-checkmark'}
                            size={100}
                            color={Colors.primary}
                            style={styles.icon}
                        />
                        <Text style={styles.successText}>Dziekujemy za złożenie zamówienia.</Text>
                    </View>
                    </View>
                <ActionButton
                        action={() => navigation.navigate('Cart')}
                        actionName={'Zamknij'}
                    />
                </View>
            </View>
    );
};

export default SuccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },

    icon: {
        margin: 20
    },

    successText: {
        color: Colors.primary,
        fontSize: 25,
        fontWeight: '700',
        margin: 20
    } ,

    contentSuccess: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%'
    },

    actionsButtonContainer: {
        marginBottom: 50
    },

});


