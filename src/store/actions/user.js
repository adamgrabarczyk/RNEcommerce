import database from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';

export const UPDATE_PERSONAL_DATA =  'UPDATE_PERSONAL_DATA';
export const CLEAR_RESPONSE_MESSAGE =  'CLEAR_RESPONSE_MESSAGE';
export const WARRINING_RESPONSE_MESSAGE =  'WARRINING_RESPONSE_MESSAGE';
export const UPDATE_EMAIL =  'UPDATE_EMAIL';
export const UPDATE_PASSWORD =  'UPDATE_PASSWORD';
export const LOADER =  'LOADER';


export const updatePersonalData = (id, name, surname, email, phone, key) => {

    console.log(name + ' ' + surname + ' ' + id);
    return async (dispatch) => {

        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);

        const token = parseAuthData.token;
        const date = new Date(parseAuthData.expireDate);
        const avatar = parseAuthData.avatar;
        const expireDate = new Date(date);

        if (name === '' || surname === '' || phone === '' ) {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wypelnij wszystkie pola!', status: false, code: 'data'})

            setTimeout(() => {
                dispatch({type: CLEAR_RESPONSE_MESSAGE, message: '', status: ''})
            }, 20000);
        } else {


            database()
                .ref('/users/' + id + '/' + key)
                .update({
                    name: name,
                    surname: surname,
                    email: email,
                    phone: phone
                })
                .then((snapshot) => {
                    console.log('Twoje dane zostały uaktualnione !');
                    console.log(snapshot);
                });

            AsyncStorage.getItem('authData').then(() => {
                AsyncStorage.setItem('authData', JSON.stringify({
                    token: token,
                    user: id,
                    expireDate: expireDate.toISOString(),
                    email: email,
                    name: name,
                    surname: surname,
                    phone: phone,
                    avatar: avatar,
                    key: key
                }))
            });

            dispatch({type: UPDATE_PERSONAL_DATA, name: name, surname: surname, email: email, phone: phone, message: 'Twoje dane zostały uaktualnione', status: true, code: 'data'});

            setTimeout(() => {
                dispatch({type: CLEAR_RESPONSE_MESSAGE, message: '', status: '', code: ''})
            }, 20000);
        }
    }
}

export const updateUserEmail = (email, password, newEmail) => {

    return async (dispatch) => {
        dispatch({type:LOADER, loader: true});

        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);

        if (email === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz adres email.', status: false, code: 'email'})
            console.log('Wpisz adres email.');
            dispatch({type:LOADER, loader: false});
        } else if (password === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz adres hasło.', status: false, code: 'email'})
            console.log('Wpisz adres hasło.');
            dispatch({type:LOADER, loader: false});
        }  else if (email === newEmail) {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Nie zmieniłeś emaila', status: false, code: 'email'})
            console.log('Nie zmieniłeś emaila');
            dispatch({type:LOADER, loader: false});
        } else {

            auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    userCredential.user.updateEmail(newEmail).then(
                        () => {
                            dispatch({type: UPDATE_EMAIL, newEmail: newEmail, message: 'Adres email został zmieniony', status: true, code: 'email'});
                            console.log('email chanched');
                            AsyncStorage.getItem('authData').then(() => {
                                AsyncStorage.setItem('authData', JSON.stringify({
                                    token: parseAuthData.token,
                                    user: parseAuthData.user,
                                    expireDate: parseAuthData.expireDate,
                                    email: newEmail,
                                    name: parseAuthData.name,
                                    surname: parseAuthData.surname,
                                    phone: parseAuthData.phone,
                                    avatar: parseAuthData.avatar,
                                    key: parseAuthData.key
                                }))
                            });
                            dispatch({type:LOADER, loader: false});
                        }
                    ).catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Podany adres jest już zajęty.', status: false, code: 'email'})
                            console.log('That email address is already in use!');
                            dispatch({type:LOADER, loader: false});
                        }

                        if (error.code === 'auth/invalid-email') {
                            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wprowadź poprawny adres email.', status: false, code: 'email'})
                            console.log('That email address is invalid!');
                            dispatch({type:LOADER, loader: false});
                        }
                    });
                })
                .catch(error => {
                    if (error.code === 'auth/wrong-password') {
                        dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Podane hasło jest błędne.', status: false, code: 'email'})
                        console.log('That password is invalid!');
                        dispatch({type:LOADER, loader: false});
                    }
                });
        }
    }
}


export const updateUserPassword = (password, newPassword, confirmPassword, userEmail) => {

    console.log(password);
    console.log(newPassword);
    console.log(confirmPassword);
    console.log(userEmail);

    return async (dispatch) => {
        dispatch({type:LOADER, loader: true});

        if (password === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz hasło.', status: false, code: 'password'})
            console.log('Wpisz hasło.');
            dispatch({type:LOADER, loader: false});
        } else if (newPassword === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz nowe hasło.', status: false, code: 'password'})
            console.log('Wpisz adres hasło.');
            dispatch({type:LOADER, loader: false});
        }  else if (confirmPassword === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Potwierdź nowe hasło.', status: false, code: 'password'})
            console.log('Potwierdź nowe hasło.');
            dispatch({type:LOADER, loader: false});
        } else if (password === newPassword) {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Nowe hasło nie może być takie samo jak stare.', status: false, code: 'password'})
            console.log('Nowe hasło nie może być takie samo jak stare.');
            dispatch({type:LOADER, loader: false});
        } else if (confirmPassword !== newPassword) {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Podane nowe hasło jest inne od potwierdzonego.', status: false, code: 'password'})
            console.log('Podane nowe hasło jest inne od potwierdzonego.');
            dispatch({type:LOADER, loader: false});
        } else {

            auth()
                .signInWithEmailAndPassword(userEmail, password)
                .then((userCredential) => {
                    userCredential.user.updatePassword(newPassword).then(
                        () => {
                            dispatch({type: UPDATE_PASSWORD, message: 'Hsło zostało zmienione', status: true, code: 'password'});
                            console.log('password chanched');
                            dispatch({type:LOADER, loader: false});
                        }
                    ).catch(error => {
                        console.log(error)
                    });
                })
                .catch(error => {
                    if (error.code === 'auth/wrong-password') {
                        dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Podane hasło jest błędne.', status: false, code: 'password'})
                        console.log('That password is invalid!');
                        dispatch({type:LOADER, loader: false});
                    }
                });

        }
    }
}

export const clearResponseMessage = () => {
    return async (dispatch) => dispatch({type: CLEAR_RESPONSE_MESSAGE, message: '', status: '', code: ''})
}
