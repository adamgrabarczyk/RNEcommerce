import React from 'react';
import {
    View,
    Text, StyleSheet,Image, ScrollView, TouchableOpacity

} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constans/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailsScreen = (props, {route, navigation}) => {

    const { productId } = props.route.params;

    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));

    const dispatch = useDispatch;
return (
    <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
        <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct))
        }}>
            <Text style={{color: Colors.primary}}>Add to cart</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
)

};

const styles = StyleSheet.create({


    image: {
            width: '100%',
            height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'

    },

    button: {
        alignItems: 'center',
    },

    price: {
        fontFamily: "OpenSans-SemiBoldItalic",
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },

    description: {
        fontFamily: "OpenSans-Regular",
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 20
    }



});

export default ProductDetailsScreen;
