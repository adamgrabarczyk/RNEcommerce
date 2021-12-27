export const UPDATE_PERSONAL_DATA =  'UPDATE_PERSONAL_DATA';
export const UPDATE_PASSWORD =  'UPDATE_PASSWORD';


export const updatePersonalData = (id, name, surname, email, phone, key) => {

    console.log(name + ' ' + surname + ' ' + id);
    return async (dispatch) => {

        dispatch({type: UPDATE_PERSONAL_DATA});
    }

}
