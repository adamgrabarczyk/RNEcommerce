import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import LoginForm from '../../components/auth/LoginForm'
import SignupForm from '../../components/auth/SignupForm'
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';



const AuthScreen = (props) => {
    const [isSignup, setIsSignup] = React.useState(false)
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.userEmail);
    const password = useSelector(state => state.auth.userPassword);
    const error = useSelector(state => state.auth.error);

    const authHandler = () => {
        if(isSignup) {
        dispatch(authActions.signup(email,password));
    }else {
            dispatch(authActions.signin(email,password));
        }

    }

    return(
        <View style={styles.container}>

            {
                isSignup ?

                    <SignupForm
                        email={(email) => dispatch(authActions.userEmail(email))}
                        password={(password) => dispatch(authActions.userPassword(password))}
                        register={authHandler}
                        changeToLogin={() => setIsSignup(prevState => !prevState)}
                    />
                    :
                    <LoginForm
                        email={(email) => dispatch(authActions.userEmail(email))}
                        password={(password) => dispatch(authActions.userPassword(password))}
                        login={authHandler}
                        changeToRegister={() => setIsSignup(prevState => !prevState)}

                    />
            }


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

