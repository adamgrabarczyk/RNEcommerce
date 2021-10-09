import {AsyncStorage} from 'react-native';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_PASSWORD = 'GET_PASSWORD';
export const USER_DATA = 'USER_DATA';


export const signup = (email, password) => {

    console.log(email + ' ' + password);

    return async dispatch => {
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
            let error = 'Wprowadź poprawne dane';
            if (errorMessage === 'EMAIL_EXISTS') {
                error = 'Podany adres email jest już zajęty';
            }
            throw new Error(error);
            console.log(errorResponse);
        }

            const resData = await response.json();
            console.log(resData);
        dispatch({type: SIGNUP, token: resData.idToken, user: resData.localId });
        const expireDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        setDataToStorage(resData.idToken, resData.localId, expireDate);
    }
}



export const signin = (email, password) => {

    console.log(email + ' ' + password + ' logowanie');

    return async dispatch => {
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
           let error = 'Wprowadź poprawne dane';
           if (errorMessage === 'EMAIL_NOT_FOUND') {
               error = 'Wprowadź poprawny adres email';
           } else if (errorMessage === 'INVALID_PASSWORD') {
               error = 'Wprowadź poprawne hasło'
           }

           throw new Error(error);
           console.log(errorResponse);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({type: LOGIN, token: resData.idToken, user: resData.localId });
        const expireDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        setDataToStorage(resData.idToken, resData.localId, expireDate);
    }
}

 const setDataToStorage = (token, user, expireDate) => {
    AsyncStorage.setItem('authData', JSON.stringify({
        token: token,
        user: user,
        expireDate: expireDate.toISOString()
    }))
 }


export const userEmail = email => {
    return {type: GET_EMAIL, email: email}
}


export const userPassword = password => {
    return {type: GET_PASSWORD, password: password}
}