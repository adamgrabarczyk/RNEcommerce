import database from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UPDATE_PERSONAL_DATA =  'UPDATE_PERSONAL_DATA';
export const UPDATE_PASSWORD =  'UPDATE_PASSWORD';


export const updatePersonalData = (id, name, surname, email, phone, key) => {

    console.log(name + ' ' + surname + ' ' + id);
    return async (dispatch) => {

        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);

        const token = parseAuthData.token;
        const date = new Date(parseAuthData.expireDate);
        const avatar = parseAuthData.avatar;
        const expireDate = new Date(date);

        database()
            .ref('/users/'+ id + '/' + key)
            .update({
                name: name,
                surname: surname,
                email: email,
                phone: phone
            })
            .then(() => {
                alert('Twoje dane zostały uaktualnione !')
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

        dispatch({type: UPDATE_PERSONAL_DATA, name: name, surname: surname, email: email, phone: phone});
    }

}
