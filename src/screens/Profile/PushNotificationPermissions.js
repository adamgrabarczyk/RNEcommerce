import React, {useState} from 'react';
import { ScrollView, View,  Text, StyleSheet} from 'react-native';
import SwitchUI from '../../components/UI/SwitchUI';

const PushNotificationPermissions = () => {

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };


    return(
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Text style={styles.header}>Powiadomienia PUSH</Text>
                <SwitchUI
                    switchCondition={isEnabled}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    switchText={'Powiadomienia o statusie zamówienia'}
                />
                <SwitchUI
                    switchCondition={isEnabled}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    switchText={'Powiadomienia o nowościcach'}
                />
                <SwitchUI
                    switchCondition={isEnabled}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    switchText={'Powiadomienia o promocjach'}
                />
                <SwitchUI
                    switchCondition={isEnabled}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    switchText={'Powiadomienia o aktualizacjach'}
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

