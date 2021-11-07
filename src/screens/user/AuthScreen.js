import * as React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import LoginForm from '../../components/auth/LoginForm'
import SignupForm from '../../components/auth/SignupForm'
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import Colors from '../../constans/Colors';


const AuthScreen = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSignup, setIsSignup] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState();
    const dispatch = useDispatch();
    const name = useSelector(state => state.auth.userName);
    const surname = useSelector(state => state.auth.userSurname);
    const phone = useSelector(state => state.auth.userPhone);
    const email = useSelector(state => state.auth.userEmail);
    const password = useSelector(state => state.auth.userPassword);
    const error = useSelector(state => state.auth.error);

    React.useEffect(() => {
        if (error) {
            setErrorMessage('error');
        }
    }, ['error']);

    const authHandler = async () => {
        let action;
        if(isSignup) {
            action = authActions.signup(name,surname,phone,email,password);
        }else {
            action = authActions.signin(email,password);
        }

        setErrorMessage(null);
        setIsLoading(true);
        try {
            await dispatch(action);

        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }

    }

    return(
        <View style={styles.container}>

            {
                isSignup ?

                    <SignupForm
                        name={(name) => dispatch(authActions.userName(name))}
                        surname={(surname) => dispatch(authActions.userSurname(surname))}
                        phone={(phone) => dispatch(authActions.userPhone(phone))}
                        email={(email) => dispatch(authActions.userEmail(email))}
                        password={(password) => dispatch(authActions.userPassword(password))}
                        register={authHandler}
                        changeToLogin={() => {
                            setIsSignup(prevState => !prevState)
                            setErrorMessage(null);
                        }}
                        spinner={isLoading ? <ActivityIndicator size='small' color={Colors.primary}/> : <View style={styles.spinnerContainer}></View>}
                        spinnerContainer={styles.spinnerContainer}
                        error={errorMessage}
                    />
                    :
                    <LoginForm
                        email={(email) => dispatch(authActions.userEmail(email))}
                        password={(password) => dispatch(authActions.userPassword(password))}
                        login={authHandler}
                        changeToRegister={() => {
                            setIsSignup(prevState => !prevState)
                            setErrorMessage(null);
                        }}
                        spinner={isLoading ? <ActivityIndicator size='small' color={Colors.primary}/> : <View style={styles.spinnerContainer}></View>}
                        spinnerContainer={styles.spinnerContainer}
                        error={errorMessage}
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
    },

    spinnerContainer: {
        width: '100%',
        height: 5,
        padding: 5
    }


})


export default AuthScreen;

