import React from 'react';
import {
    View
} from 'react-native';

import ProductOverviewScreen from './shop/ProductOverviewScreen';


const Home = (props) => {

    return(
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
            <ProductOverviewScreen {...props}/>
        </View>
    )
}




export default Home;


