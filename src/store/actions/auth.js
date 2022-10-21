import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';


export const LOGIN = 'LOGIN';
export const AUTOLOGIN = 'AUTOLOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const GET_NAME = 'GET_NAME';
export const GET_SURNAME = 'GET_SURNAME';
export const GET_PHONE = 'GET_PHONE';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_PASSWORD = 'GET_PASSWORD';
export const USER_DATA = 'USER_DATA';
export const UNCORRECT = 'UNCORRECT';
export const CORRECT = 'CORRECT';
export const RESET_USER_LOG = 'RESET_USER_LOG';
export const DELETE_AVATAR = 'DELETE_AVATAR';
export const SET_USER_AVATAR_TO_STORAGE = 'SET_USER_AVATAR_TO_STORAGE';


export const signup = (name, surname, phone, email, password) => {

    let error;
    return async dispatch => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let numberReg = /^[0-9\b\+\-\(\)]+$/;

        if (name === '' && surname === '' && phone === '' && email === '' && password === '') {
            error = "Wprowadź wszystkie dane";
            throw new Error(error);
        } else if (reg.test(email) === false) {
            error = "Wprowadź poprawny adres emial";
            throw new Error(error);
        } else if (email === '') {
            error = "Wprowadź adres emial";
            throw new Error(error);
        } else if (password === '') {
            error = "Wprowadź hasło";
            throw new Error(error);
        } else if (name === '') {
            error = "Wprowadź imię";
            throw new Error(error);
        } else if (name.length < 2) {
            error = "Wprowadź poprawne imię";
            throw new Error(error);
        } else if (surname === '') {
            error = "Wprowadź nazwisko";
            throw new Error(error);
        } else if (password.length < 2) {
            error = "Wprowadź poprawne nazwisko";
            throw new Error(error);
        } else if (phone === '') {
            error = "Wprowadź numer kontaktowy";
            throw new Error(error);
        } else if (phone.length < 9) {
            error = "Numer telefonu jest za krótki";
            throw new Error(error);
        } else if (numberReg.test(phone) === false) {
            error = "Wprowadź poprawny numer telefonu";
            throw new Error(error);
        }
        else {

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWNcZ_aSsnV-HIWEaqxwz9e0V6zB_jx2w'
                , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })

                });

            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.error.message;
                error = 'Wprowadź poprawne dane';
                if (errorMessage === 'EMAIL_EXISTS') {
                    error = 'Podany adres email jest już zajęty';
                }
                throw new Error(error);
            }
            const resData = await response.json();

            const uri = {
                uri: ''
            };

            const userData = await fetch(
                `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/users/${resData.localId}.json`
                , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        surname: surname,
                        email: email,
                        phone: phone,
                        userId: resData.localId,
                        avatar: uri,

                    })

                });

            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });


            dispatch({
                type: SIGNUP,
                token: resData.idToken,
                user: resData.localId,
                email: email,
                avatar: resData.avatar
            });
            const expireDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
            setDataToStorage(resData.idToken, resData.localId, expireDate, email, name, surname, phone);
            alert('Your account are registered! You can use our app now!')
        }
    }
};



export const signin = (email, password) => {
    let error;
    return async (dispatch,getState) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (email === '' && password === '') {
            error = "Wprowadź email i hasło";
            throw new Error(error);
        } else if (reg.test(email) === false) {
            error = "Wprowadź poprawny adres emial";
            throw new Error(error);
        } else if (email === '') {
            error = "Wprowadź adres emial";
            throw new Error(error);
        } else if (password === '') {
            error = "Wprowadź hasło";
            throw new Error(error);
        }
        else {

            const prevUserId = getState().cart.user;
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWNcZ_aSsnV-HIWEaqxwz9e0V6zB_jx2w'
                , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })

                });

            if (!response.ok) {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.error.message;
                error = 'Wprowadź poprawne dane';
                if (errorMessage === 'EMAIL_NOT_FOUND') {
                    error = 'Wprowadź poprawny adres email';
                } else if (errorMessage === 'INVALID_PASSWORD') {
                    error = 'Wprowadź poprawne hasło'
                }
                throw new Error(error);
            }

            auth()
                .signInWithEmailAndPassword(email, password)
                .then(async () => {
                    console.log('User account signed in!');


                    const resData = await response.json();

                    const userDataResponse = await fetch(
                        `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/users/${resData.localId}.json`
                    );

                    const userResData = await userDataResponse.json();

                    const personalUserData = {
                        name: '',
                        surname: '',
                        phone: '',
                        avatar: '',
                        key: ''

                    };

                    for (const key in userResData) {
                        if (userResData[key].userId === resData.localId) {
                            personalUserData.name = userResData[key].name;
                            personalUserData.surname = userResData[key].surname;
                            personalUserData.phone = userResData[key].phone;
                            personalUserData.avatar = userResData[key].avatar.uri;
                            personalUserData.avatarPath = userResData[key].avatar.imageUri;
                            personalUserData.key = key;
                        }else {
                            personalUserData.avatar = userResData.avatar.uri;
                        }
                    }

                    if (resData.localId !== prevUserId) {
                        dispatch({type: 'RESET_USER_LOG'})
                    }

                    dispatch({
                        type: LOGIN,
                        token: resData.idToken,
                        email: email,
                        user: resData.localId,
                        name: personalUserData.name,
                        surname: personalUserData.surname,
                        phone: personalUserData.phone,
                        avatar: personalUserData.avatar,
                        avatarPath: personalUserData.avatarPath,
                        key: personalUserData.key
                    });
                    const expireDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
                    setDataToStorage(resData.idToken, resData.localId, expireDate, email, personalUserData.name, personalUserData.surname,
                        personalUserData.phone, personalUserData.avatar, personalUserData.key);
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });

        }
    }
}

 export const autoLogin = (authData) => {
    const data = JSON.parse(authData);
    const user = data.user;
    const key = data.key;

     return async (dispatch) => {

         const userData = await fetch(
             `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/${key}.json`
         );

         if (!userData.ok) {
             throw new Error('auto login fetch error');
         }

         const response = await userData.json();

         dispatch({
             type: AUTOLOGIN,
             authData: data,
             token: data.token,
             user: data.user,
             expireDate: data.expireDate,
             email: data.email,
             name: data.name,
             surname: data.surname,
             avatar: response.avatar.uri,
             avatarPath: response.avatar.imageUri,
             key: data.key})
     }

 }

 const setDataToStorage = async (token, user, expireDate, email, name, surname, phone, avatar, key) => {
   await AsyncStorage.setItem('authData', JSON.stringify({
        token: token,
        user: user,
        expireDate: expireDate.toISOString(),
        email: email,
        name: name,
        surname: surname,
        phone: phone,
        avatar: avatar,
        key: key
    }))
 };

export const logout = () => {
    AsyncStorage.removeItem('authData');
    auth().signOut();
    return {type: LOGOUT}
}

export const unCorrectData = () => {
    return {type: UNCORRECT}
}

export const correctData = () => {
    return {type: CORRECT}
}

export const userName = name => {
    return {type: GET_NAME, name: name}
}

export const userSurname = surname => {
    return {type: GET_SURNAME, surname: surname}
}

export const userPhone = phone => {
    return {type: GET_PHONE, phone: phone}
}

export const userEmail = email => {
    return {type: GET_EMAIL, email: email}
}


export const userPassword = password => {
    return {type: GET_PASSWORD, password: password}
}


export const setAvatar = (uri, imageUri) => {

    return async (dispatch, getState) => {
        const user = getState().auth.user;
        const key = getState().auth.key;

        const userData = await fetch(
            `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/${key}/avatar.json`
            , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uri,
                    imageUri
                })
            }
            );

        if (!userData.ok) {
            throw new Error(error);
        }

        dispatch({type: SET_USER_AVATAR_TO_STORAGE, uri: uri, imageUri: imageUri})
    }
};

export const deleteAvatar = (url) => {

    return async (dispatch, getState) => {
        const user = getState().auth.user;
        const key = getState().auth.key;
        let uri = '';

        const userData = await fetch(
            `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/${key}/avatar.json`
            , {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uri

                })

            }
        );

        if (!userData.ok) {
            throw new Error('something went wrong');
        }
        dispatch({type: DELETE_AVATAR})
    }
};
