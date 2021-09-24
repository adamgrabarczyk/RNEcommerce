import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';



const AuthScreen = (props) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.userEmail);
    const password = useSelector(state => state.auth.userPassword);
    const error = useSelector(state => state.auth.error);

    const signupHandler = () => {
        dispatch(authActions.signup(email,password));
    }

    return(
        <View style={styles.container}>
            <TextInput style={styles.inputBox}
                       placeholder='Email'
                       placeholderTextColor='#ffffff'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       selectionColor='#ffffff'
                       keyboardType='email-address'
                       autoCapitalize = 'none'
                       onChangeText={
                           email => dispatch(authActions.userEmail(email))
                       }

            />
            <Text style={{color: 'black'}}>{email}</Text>
            <TextInput style={styles.inputBox}
                       placeholder='Hasło'
                       placeholderTextColor='#ffffff'
                       underlineColorAndroid='rgba(0,0,0,0)'
                       secureTextEntry={true}
                       autoCapitalize = 'none'
                       selectionColor='#ffffff'
                       onChangeText={
                           password => dispatch(authActions.userPassword(password))
                       }
            />
            <Text style={{color: 'black'}}>{password}</Text>
            <TouchableOpacity style={styles.button}
                              onPress={signupHandler}
            >
                <Text style={styles.buttonText}>Zaloguj</Text>
            </TouchableOpacity>
            <Text style={{color: 'red'}} onPress={() => console.log(error)}>{error}</Text>

            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Register')}>

                <Text style={styles.buttonText}>Nie masz konta? Zarejestruj się!</Text>
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
        color: 'lightgrey',
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

