import React from 'react';
import {
    View,
    Text, StyleSheet,Image, ScrollView, TouchableOpacity

} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constans/Colors';

const ProductDetailsScreen = (props, {route, navigation}) => {

    const { productId } = props.route.params;

    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))

return (
    <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
        <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => {}}><Text style={{color: Colors.primary}}>Add to cart</Text></TouchableOpacity>
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
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },

    description: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 20
    }



});

export default ProductDetailsScreen;
