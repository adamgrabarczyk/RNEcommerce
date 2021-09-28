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
                throw new Error('signup blah');
            }

            const resData = await response.json();
            console.log(resData);
        dispatch({type: SIGNUP});
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
            throw new Error('login blah');
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({type: LOGIN});
    }
}


export const userEmail = email => {
    return {type: GET_EMAIL, email: email}
}


export const userPassword = password => {
    return {type: GET_PASSWORD, password: password}
}
