import database from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';

export const UPDATE_PERSONAL_DATA =  'UPDATE_PERSONAL_DATA';
export const CLEAR_RESPONSE_MESSAGE =  'CLEAR_RESPONSE_MESSAGE';
export const WARRINING_RESPONSE_MESSAGE =  'WARRINING_RESPONSE_MESSAGE';
export const UPDATE_EMAIL =  'UPDATE_EMAIL';
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

        if (email === '' || password === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Uzupełnij wszystkie pola.', status: false, code: 'email'})
            console.log('Uzupełnij wszystkie pola.');
            dispatch({type:LOADER, loader: false});
        } else if (email === newEmail) {
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


export const clearResponseMessage = () => {
    return async (dispatch) => dispatch({type: CLEAR_RESPONSE_MESSAGE, message: '', status: '', code: ''})
}
