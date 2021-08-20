import React from 'react';
import {
    View,
    Text, StyleSheet,Button
} from 'react-native';


import ProductOverviewScreen from './shop/ProductOverviewScreen';
import {useSelector} from 'react-redux';




const Home = (props, { navigation }) => {

    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);

    return(
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
            <ProductOverviewScreen {...props}/>
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        fontFamily: 'OpenSans-SemiBoldItalic'
    }
})


export default Home;


