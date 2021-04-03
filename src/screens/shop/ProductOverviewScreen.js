import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constans/Colors';



const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title

        });
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    description={itemData.item.description}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                    >
                    <TouchableOpacity onPress={ () => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}><Text style={styles.actionsButton}>View Details</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item));
                    }}><Text style={styles.actionsButton} >To cart</Text></TouchableOpacity>
                </ProductItem>
            )}
        />
    );
};


export default ProductsOverviewScreen;


const styles = StyleSheet.create({

    actionsButton: {
        color: Colors.accent
    }
});
