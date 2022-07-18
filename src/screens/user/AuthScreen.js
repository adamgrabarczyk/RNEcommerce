import React from 'react';
import {
    View, ScrollView,
    StyleSheet,
    ActivityIndicator,
    Platform,
    Text, Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native';
import LoginForm from '../../components/auth/LoginForm'
import SignupForm from '../../components/auth/SignupForm'
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import Colors from '../../constans/Colors';
import WelcomeBanner from '../../components/UI/WelcomeBanner';


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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.loginScreenContainer}>

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.innerTouch}>
                        <ScrollView>
                        <WelcomeBanner/>
                        </ScrollView>
                        </TouchableWithoutFeedback>
                        {
                            Platform.OS === 'android' ?
                                <ScrollView style={styles.form}>
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
                                </ScrollView>
                                :
                                <View style={styles.form}>
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

                    </KeyboardAvoidingView>
            }
        </TouchableWithoutFeedback>
            )
}

const styles = StyleSheet.create({

    loginScreenContainer: {
        flex: 1,
        width:  '100%',
        flexDirection: 'column',
        backgroundColor: '#5956E9'
    },

    innerTouch: {
        minHeight: '40%'
    },
    form: {
        minHeight: '60%'
    },
    topArea: {
        backgroundColor: '#5956E9'
    },
    bottomArea: {
      backgroundColor: 'white'
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

