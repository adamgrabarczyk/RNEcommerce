import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList

} from 'react-native';
import {useSelector} from 'react-redux';
import Favourite from '../Favourite';


const ProductOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts)

    return<FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
            />

}



export default ProductOverviewScreen;


