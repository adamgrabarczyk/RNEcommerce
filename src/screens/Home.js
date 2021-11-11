import React, {useEffect} from 'react';
import {
    View
} from 'react-native';

import ProductOverviewScreen from './shop/ProductOverviewScreen';
import * as productActioncs from '../store/actions/products';
import {useDispatch} from 'react-redux';


const Home = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(productActioncs.fetchFavs());
    }, [dispatch]);
    return(
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
            <ProductOverviewScreen {...props}/>
        </View>
    )
}




export default Home;


