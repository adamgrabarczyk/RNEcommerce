import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity, Image, Keyboard,
} from 'react-native';
import Device from '../../constans/Device';

const LoginForm = (props) => {

    return(
        <View style={styles.container} onPress={Keyboard.dismiss}>
            <View>
            <Text style={styles.label}>Logowanie</Text>

                <View style={styles.envelopeContainer}>
                    <View>
                <Image style={styles.envelopeCenter} source={require('../../images/icons/envelope1.png')}/>
                <Image style={styles.envelopeOut} source={require('../../images/icons/envelope2.png')}/>
                    </View>
                    <Text style={styles.labelText}>Email</Text>
                    </View>
            <TextInput style={styles.inputBox}
                       placeholder='user@email.com'
                       placeholderTextColor='#545353'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       selectionColor='#ffffff'
                       keyboardType='email-address'
                       autoCapitalize = 'none'
                       onChangeText={
                         props.email
                       }

            />
                <View style={styles.envelopeContainer}>
                    <View>
                        <Image style={styles.envelopeOut} source={require('../../images/icons/Lock.png')}/>
                    </View>
                    <Text style={styles.labelText}>Hasło</Text>
                </View>
            <TextInput style={styles.inputBox}
                       placeholder='* * * * * * * * *'
                       placeholderTextColor='#545353'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       secureTextEntry={true}
                       autoCapitalize = 'none'
                       selectionColor='#ffffff'
                       onChangeText={
                          props.password
                       }
            />
                <TouchableOpacity  onPress={() => {}} style={styles.resetPassword}>

                    <Text style={styles.resetPasswordText}>Zapomniałeś hasła?</Text>
                </TouchableOpacity>
            <View style={props.spinnerContainer}>
            {props.spinner}
            </View>
                <Text style={styles.errorText} onPress={() => console.log(props.error)}>{props.error}</Text>
                <TouchableOpacity style={styles.button}
                              onPress={props.login}
            >
                <Text style={styles.buttonText}>Zaloguj</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={props.changeToRegister}>

                <Text style={styles.switchText}>Załóż konto</Text>
            </TouchableOpacity>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '100%',
        borderTopRightRadius: 15,
        borderTopStartRadius: 15,
        paddingBottom: Device.height < 700 ? 30 : 100,
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: -1},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },

    inputBox: {
        width: 320,
        borderBottomWidth: 1,
        borderBottomColor: '#C9C9C9',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000000',
        marginVertical: 10,
    },

    label: {
        height: Device.height < 700 ? 20 : 21,
        top: 10,
        marginTop: Device.height < 700 ? 0 : 15,
        marginBottom: Device.height < 700 ? 0 : 15,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: Device.height < 700 ? 16 : 18,
        lineHeight: 21,
        color: '#000000'
    },
    labelText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#868686',
        top: 2
    },

    switchText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#5956E9',
        textAlign: 'center'
    },

    resetPassword: {
        marginTop: Device.height < 700 ? 0 : 10
    },
    resetPasswordText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#5956E9'
    },
    button: {
        marginBottom: 25,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#5956E9",
        borderRadius: 10,
        paddingHorizontal: 16,
        marginVertical: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        marginVertical: 10
    },

    envelopeContainer: {
        flexDirection: 'row',
        height: 17,
        left: 2,
        marginTop: Device.height < 700 ? 28 : 30
    },

    envelopeCenter: {
        position: 'absolute',
        top: 7,
        left: 4
    },

    envelopeOut: {
        borderWidth: 0
    },

    errorText: {
        textAlign: 'center',
        color: 'red',
        marginTop: Device.height < 700 ? 0 : 20,
        minHeight: 20
    }


})


export default LoginForm;

