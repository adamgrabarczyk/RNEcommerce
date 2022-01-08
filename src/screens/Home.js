import React, {useEffect} from 'react';
import {
    View
} from 'react-native';

import ProductOverviewScreen from './shop/ProductOverviewScreen';
import * as productActioncs from '../store/actions/products';
import {useDispatch} from 'react-redux';
import * as userActions from '../store/actions/user';


const Home = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActioncs.fetchFavs());
        dispatch(userActions._getUserAddresses());
    }, [dispatch]);
    return(
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
            <ProductOverviewScreen {...props}/>
        </View>
    )
}




export default Home;


