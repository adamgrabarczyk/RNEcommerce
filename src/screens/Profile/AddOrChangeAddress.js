import React, {useEffect, useState} from 'react';
import * as userActions from '../../store/actions/user';
import Spinner from '../../components/UI/Spinner';
import {useDispatch} from 'react-redux';
import Address from '../../components/user/Address';

const AddOrChangeAddress = ({route}) => {
    const dispatch = useDispatch();

    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [postcode, setPostcode] = useState('');
    const [addressId, setAddressId] = useState();
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        dispatch(userActions.clearResponseMessage());
        setLoading(true);

        const getUserData = async () => {
            if(route.params !== undefined) {
                const {address} = route.params;
                setCity(address.city);
                setStreet(address.street);
                setHouseNumber(address.houseNumber);
                setApartmentNumber(address.apartmentNumber);
                setPostcode(address.postcode);
                setAddressId(address.id);
                setUpdate(true);
            }
            dispatch(userActions.clearResponseMessage);
        };
        getUserData().then(
            () => {
                setTimeout(
                    () => {
                        setLoading(false);
                    }, 1000
                )

            }
        );
    },[]);

    if (loading) {
        return <Spinner
            spinnerSize={'fullScreen'}
        />
    }


    return (
        <Address
            update={update}
            addressId={addressId}
            city={city}
            setCity={(value) => setCity(value)}
            street={street}
            setStreet={(value) => setStreet(value)}
            houseNumber={houseNumber}
            setHouseNumber={(value) => setHouseNumber(value)}
            apartmentNumber={apartmentNumber}
            setApartmentNumber={(value) => setApartmentNumber(value)}
            postcode={postcode}
            setPostcode={(value) => setPostcode(value)}
            route={'Adresses'}
        />
    );
}

export default AddOrChangeAddress;



