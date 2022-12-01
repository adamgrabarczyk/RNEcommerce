import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Colors from '../../constans/Colors';



const SignupForm = (props) => {

    return(
        <View style={styles.container}>

            <TextInput style={styles.inputBox}
                       placeholder='Imie'
                       placeholderTextColor='#ffffff'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       autoCapitalize = 'none'
                       selectionColor='#ffffff'
                       onChangeText={
                           props.name
                       }
            />

            <TextInput style={styles.inputBox}
                       placeholder='Nazwisko'
                       placeholderTextColor='#ffffff'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       autoCapitalize = 'none'
                       selectionColor='#ffffff'
                       onChangeText={
                           props.surname
                       }
            />

            <TextInput style={styles.inputBox}
                       placeholder='Telefon'
                       placeholderTextColor='#ffffff'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       autoCapitalize = 'none'
                       selectionColor='#ffffff'
                       keyboardType="numeric"
                       maxLength={12}
                       onChangeText={
                           props.phone
                       }
            />

            <TextInput style={styles.inputBox}
                       placeholder='Email'
                       placeholderTextColor='#ffffff'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       selectionColor='#ffffff'
                       keyboardType='email-address'
                       autoCapitalize = 'none'
                       onChangeText={
                           props.email
                       }

            />
            <TextInput style={styles.inputBox}
                       placeholder='Hasło'
                       placeholderTextColor='#ffffff'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       secureTextEntry={true}
                       autoCapitalize = 'none'
                       selectionColor='#ffffff'
                       onChangeText={
                           props.password
                       }
            />
            <View style={props.spinnerContainer}>
                {props.spinner}
            </View>
            <TouchableOpacity style={styles.button}
                              onPress={props.register}
            >
                <Text style={styles.buttonText}>Zarejestruj</Text>
            </TouchableOpacity>
            <Text style={{color: 'red'}} onPress={() => console.log(props.error)}>{props.error}</Text>

            <TouchableOpacity  onPress={props.changeToLogin}>

                <Text style={styles.buttonChangeText}>Masz już konto? Zaloguj się!</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ffffff'
    },

    inputBox: {
        width: 320,
        height: 40,
        backgroundColor: 'lightgrey',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
        marginVertical: 10
    },
    button: {
        width: 320,
        height: 40,
        backgroundColor: Colors.primary,
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
    },

    buttonChangeText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.primary,
        textAlign: 'center',
        marginVertical: 10
    }


})


export default SignupForm;

