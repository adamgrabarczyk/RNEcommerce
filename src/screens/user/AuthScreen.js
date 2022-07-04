import * as React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    Text
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
        <SafeAreaView style={styles.container}>

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
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.welcomeBanner}>
                        </View>
                    <LoginForm
                        email={(email) => dispatch(authActions.userEmail(email))}
                        password={(password) => dispatch(authActions.userPassword(password))}
                        login={authHandler}
                        changeToRegister={() => {
                            setIsSignup(prevState => !prevState)
                            setErrorMessage(null);
                        }}
                        spinner={isLoading ? <ActivityIndicator size='small' color={'#5956E9'}/>
                            : <Text></Text>
                        }
                        spinnerContainer={styles.spinnerContainer}
                        error={errorMessage}
                    />
                    </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    loginScreenContainer: {
        width:  '100%',
        borderRadius: 100
    },

    welcomeBanner: {
        width: '100%',
        height: 250
    },

    container : {
        flexGrow: 1,
        flex: 1,
        backgroundColor: '#5956E9'
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
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 35,
        padding: 5,
        top: 15
    }


})


export default AuthScreen;

