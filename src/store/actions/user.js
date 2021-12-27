import database from '@react-native-firebase/database';

export const UPDATE_PERSONAL_DATA =  'UPDATE_PERSONAL_DATA';
export const UPDATE_PASSWORD =  'UPDATE_PASSWORD';


export const updatePersonalData = (id, name, surname, email, phone, key) => {

    console.log(name + ' ' + surname + ' ' + id);
    return async (dispatch) => {


        // const userName = await fetch(
        //     `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/users/${id}/${key}/name.json`
        //     , {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             name
        //         })
        //     }
        // );
        //
        // if (!userName.ok) {
        //     throw new Error(error);
        // }

        database()
            .ref('/users/'+ id + '/' + key)
            .update({
                name: name,
            })
            .then(() => console.log('Data updated.'));


        console.log('job done');
        dispatch({type: UPDATE_PERSONAL_DATA});
    }

}
