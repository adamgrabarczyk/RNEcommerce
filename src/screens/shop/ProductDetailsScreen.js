import React from 'react';
import {
    View,
    Text, StyleSheet,Image, ScrollView, TouchableOpacity

} from 'react-native';
import {useSelector} from 'react-redux';

const ProductDetailsScreen = (props, {route, navigation}) => {

    const { productId } = props.route.params;

    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))

return (
    <View>
        <Text>{selectedProduct.title}</Text>
    </View>
)

};

const styles = StyleSheet.create({



});

export default ProductDetailsScreen;
