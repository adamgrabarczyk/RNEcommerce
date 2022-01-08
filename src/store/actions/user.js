import database from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';

export const UPDATE_PERSONAL_DATA =  'UPDATE_PERSONAL_DATA';
export const CLEAR_RESPONSE_MESSAGE =  'CLEAR_RESPONSE_MESSAGE';
export const WARRINING_RESPONSE_MESSAGE =  'WARRINING_RESPONSE_MESSAGE';
export const UPDATE_EMAIL =  'UPDATE_EMAIL';
export const UPDATE_PASSWORD =  'UPDATE_PASSWORD';
export const ADD_ADDRESS =  'ADD_ADDRESS';
export const UPDATE_ADDRESS =  'UPDATE_ADDRESS';
export const DELETE_ADDRESS =  'DELETE_ADDRESS';
export const GET_ADDRESSES =  'GET_ADDRESSES';
export const LOADER =  'LOADER';


export const updatePersonalData = (id, name, surname, email, phone, key) => {

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
                .then(() => {
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
        const id = parseAuthData.user;
        const key = parseAuthData.key;

        if (email === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz adres email.', status: false, code: 'email'})
            dispatch({type:LOADER, loader: false});
        } else if (password === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz adres hasło.', status: false, code: 'email'})
            dispatch({type:LOADER, loader: false});
        }  else if (email === newEmail) {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Nie zmieniłeś emaila', status: false, code: 'email'})
            dispatch({type:LOADER, loader: false});
        } else {

            auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    userCredential.user.updateEmail(newEmail).then(
                        () => {
                            database()
                                .ref('/users/' + id + '/' + key)
                                .update({
                                    email: newEmail,
                                })
                                .then(() => {
                                });

                            dispatch({type: UPDATE_EMAIL, newEmail: newEmail, message: 'Adres email został zmieniony', status: true, code: 'email'});
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
                            dispatch({type:LOADER, loader: false});
                        }

                        if (error.code === 'auth/invalid-email') {
                            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wprowadź poprawny adres email.', status: false, code: 'email'})
                            dispatch({type:LOADER, loader: false});
                        }
                    });
                })
                .catch(error => {
                    if (error.code === 'auth/wrong-password') {
                        dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Podane hasło jest błędne.', status: false, code: 'email'})
                        dispatch({type:LOADER, loader: false});
                    }
                });
        }
    }
}


export const updateUserPassword = (password, newPassword, confirmPassword, userEmail) => {

    return async (dispatch) => {
        dispatch({type:LOADER, loader: true});

        if (password === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz hasło.', status: false, code: 'password'})
            dispatch({type:LOADER, loader: false});
        } else if (newPassword === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz nowe hasło.', status: false, code: 'password'})
            dispatch({type:LOADER, loader: false});
        }  else if (confirmPassword === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Potwierdź nowe hasło.', status: false, code: 'password'})
            dispatch({type:LOADER, loader: false});
        } else if (password === newPassword) {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Nowe hasło nie może być takie samo jak stare.', status: false, code: 'password'})
            dispatch({type:LOADER, loader: false});
        } else if (confirmPassword !== newPassword) {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Podane nowe hasło jest inne od potwierdzonego.', status: false, code: 'password'})
            dispatch({type:LOADER, loader: false});
        } else {

            auth()
                .signInWithEmailAndPassword(userEmail, password)
                .then((userCredential) => {
                    userCredential.user.updatePassword(newPassword).then(
                        () => {
                            dispatch({type: UPDATE_PASSWORD, message: 'Hsło zostało zmienione', status: true, code: 'password'});
                            dispatch({type:LOADER, loader: false});
                        }
                    ).catch(error => {
                        console.log(error)
                    });
                })
                .catch(error => {
                    if (error.code === 'auth/wrong-password') {
                        dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Podane hasło jest błędne.', status: false, code: 'password'})
                        dispatch({type:LOADER, loader: false});
                    }
                });

        }
    }
}

export const addAddress = (city, street, house, apartment, postcode) => {

    return async (dispatch) => {
        dispatch({type:LOADER, loader: true});
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const id = parseAuthData.user;
        const key = parseAuthData.key;

        if (city === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz miasto.', status: false, code: 'address'})
            dispatch({type:LOADER, loader: false});
        } else if (street === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz ulicę.', status: false, code: 'address'})
            dispatch({type:LOADER, loader: false});
        } else if (house === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz numer domu.', status: false, code: 'address'})
            dispatch({type:LOADER, loader: false});
        } else if (postcode === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz kod pocztowy.', status: false, code: 'address'})
            dispatch({type:LOADER, loader: false});
        } else {

            database()
                .ref('/users/' + id + '/' + key + '/addresses/').push()
                .set({
                    city: city,
                    street: street,
                    houseNumber: house,
                    apartmentNumber: apartment,
                    postcode: postcode
                })
                .then(() => {
                    dispatch({type: ADD_ADDRESS, message: 'Address został dodany', status: true, code: 'address'});
                    dispatch({type: LOADER, loader: false});
                });
        }


    }
}


export const updateAddress = (addressId, city, street, house, apartment, postcode) => {

    return async (dispatch) => {
        dispatch({type:LOADER, loader: true});
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const id = parseAuthData.user;
        const key = parseAuthData.key;

        if (city === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz miasto.', status: false, code: 'address'})
            dispatch({type:LOADER, loader: false});
        } else if (street === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz ulicę.', status: false, code: 'address'})
            dispatch({type:LOADER, loader: false});
        } else if (house === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz numer domu.', status: false, code: 'address'})
            dispatch({type:LOADER, loader: false});
        } else if (postcode === '') {
            dispatch({type: WARRINING_RESPONSE_MESSAGE, message: 'Wpisz kod pocztowy.', status: false, code: 'address'})
            dispatch({type:LOADER, loader: false});
        } else {
            database()
                .ref('/users/' + id + '/' + key + '/addresses/' + addressId)
                .update({
                    city: city,
                    street: street,
                    houseNumber: house,
                    apartmentNumber: apartment,
                    postcode: postcode
                })
                .then(() => {
                    dispatch({
                        type: UPDATE_ADDRESS,
                        message: 'Address został zmieniony',
                        status: true,
                        code: 'address'
                    });
                    dispatch({type: LOADER, loader: false});
                });

        }

    }
}

export const _getUserAddresses = () => {

    return async (dispatch) => {
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const id = parseAuthData.user;
        const key = parseAuthData.key;

        database()
            .ref('/users/' + id + '/' + key + '/addresses/')
            .on('value', snapshot => {
                const data = snapshot.val();
                const ids = Object.keys(data);
                let arr = [];

                ids.forEach((key) => {
                        const values = Object.values(data[key]);
                        arr.push({'id': key, 'city': values[3], 'street': values[2], 'houseNumber': values[1], 'apartmentNumber': values[0], 'postcode': values[4] })
                    });

                dispatch({type: GET_ADDRESSES, addresses: arr});
            })
    }
}

export const deleteAddress = (addressId) => {

    return async (dispatch, getState) => {
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const id = parseAuthData.user;
        const key = parseAuthData.key;

        const currentAddresses = getState().user.addresses;

        const updatedAddresses = currentAddresses.filter(
            (address) => address.id !== addressId
        );

        await database()
            .ref('/users/' + id + '/' + key + '/addresses/' + addressId)
            .remove()
            .then(() => {
                console.log('Twój adres o id ' + addressId + ' został usuniety');
                dispatch({type: DELETE_ADDRESS, addresses: updatedAddresses});
            });

  }

}

export const clearResponseMessage = () => {
    return async (dispatch) => dispatch({type: CLEAR_RESPONSE_MESSAGE, message: '', status: '', code: ''})
}
