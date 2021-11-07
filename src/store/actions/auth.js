import AsyncStorage from '@react-native-async-storage/async-storage';

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


export const signup = (name, surname, phone, email, password) => {

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
                })

            });


            console.log(resData);
        dispatch({type: SIGNUP, token: resData.idToken, user: resData.localId, email: email});
        const expireDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        setDataToStorage(resData.idToken, resData.localId, expireDate, email, name, surname, phone);
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

        const userDataEesponse = await fetch(
            `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/users/${resData.localId}.json`
        );

        const userResData = await userDataEesponse.json();

        const personalUserData = {
            name: '',
            surname: '',
            phone: ''
        };

        for (const key in userResData) {
            console.log(userResData[key].name)
            if (userResData[key].userId === resData.localId)  {
                    console.log('succes!')
                personalUserData.name = userResData[key].name;
                personalUserData.surname = userResData[key].surname;
                personalUserData.phone = userResData[key].phone;
            }else {
                console.log('big bug!!')
            }
        }

        dispatch({type: LOGIN, token: resData.idToken, user: resData.localId, name: personalUserData.name, surname: personalUserData.surname, phone: personalUserData.phone });
        const expireDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        setDataToStorage(resData.idToken, resData.localId, expireDate, email, personalUserData.name, personalUserData.surname, personalUserData.phone);
    }
}

 export const autoLogin = (authData) => {
    console.log(JSON.parse(authData));
    const data = JSON.parse(authData);
     return({type: AUTOLOGIN, authData: data, token: data.token, user: data.user, expireDate: data.expireDate, email: data.email})
 }

 const setDataToStorage = async (token, user, expireDate, email, name, surname, phone) => {
   await AsyncStorage.setItem('authData', JSON.stringify({
        token: token,
        user: user,
        expireDate: expireDate.toISOString(),
        email: email,
        name: name,
        surname: surname,
        phone: phone
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
