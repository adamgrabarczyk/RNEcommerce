import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN = 'LOGIN';
export const AUTOLOGIN = 'AUTOLOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_PASSWORD = 'GET_PASSWORD';
export const USER_DATA = 'USER_DATA';
export const UNCORRECT = 'UNCORRECT';
export const CORRECT = 'CORRECT';


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
        dispatch({type: SIGNUP, token: resData.idToken, user: resData.localId, email: email });
        const expireDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        setDataToStorage(resData.idToken, resData.localId, expireDate, email);
        alert('Your account are registered! You can use our app now!')
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
        setDataToStorage(resData.idToken, resData.localId, expireDate, email);
    }
}

 export const autoLogin = (authData) => {
    console.log(JSON.parse(authData));
    const data = JSON.parse(authData);
     return({type: AUTOLOGIN, authData: data, token: data.token, user: data.user, expireDate: data.expireDate, email: data.email})
 }

 const setDataToStorage = async (token, user, expireDate, email) => {
   await AsyncStorage.setItem('authData', JSON.stringify({
        token: token,
        user: user,
        expireDate: expireDate.toISOString(),
        email: email
    }))
 };

export const logout = () => {
    AsyncStorage.removeItem('authData');
    return {type: LOGOUT}
}

export const unCorrectData = () => {
    return {type: UNCORRECT}
}

export const correctData = () => {
    return {type: CORRECT}
}

export const userEmail = email => {
    return {type: GET_EMAIL, email: email}
}


export const userPassword = password => {
    return {type: GET_PASSWORD, password: password}
}
