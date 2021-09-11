import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';


const AuthScreen = (props) => {
    const dispatch = useDispatch();

    return(
        <View style={styles.container}>
            <TextInput style={styles.inputBox}
                       placeholder='Email'
                       placeholderTextColor='#ffffff'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       selectionColor='#ffffff'
                       keyboardType='email-address'
                       autoCapitalize = 'none'
            />
            <TextInput style={styles.inputBox}
                       placeholder='Hasło'
                       placeholderTextColor='#ffffff'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       secureTextEntry={true}
                       autoCapitalize = 'none'
                       selectionColor='#ffffff'
            />

            <TouchableOpacity style={styles.button}
                              onPress={() => {
                                  dispatch({ type: 'LOGIN' })
                              }}
            >
                <Text style={styles.buttonText}>Zaloguj</Text>
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
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 10
    },
    button: {
        width: 320,
        height: 40,
        backgroundColor: "#3e8a6f",
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10,
    }


})


export default AuthScreen;

