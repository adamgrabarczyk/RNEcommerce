import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';



const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.fetchProducts());
    }, [dispatch]);

    const selectItemHandler = (id, name) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: name

        });
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.image}
                    name={itemData.item.name}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.name);
                    }}
                    >
                    <TouchableOpacity onPress={ () => {
                        selectItemHandler(itemData.item.id, itemData.item.name);
                    }}><Text style={styles.actionsButton}>View Details</Text></TouchableOpacity>
                    { userFavProducts.find(product => product.id === itemData.item.id) ?
                        <TouchableOpacity onPress={() => {
                            dispatch(productActions.deleteFromFav(itemData.item.id.toString()));
                        }}>
                            <Ionicons
                                name={'star-sharp'}
                                size={23}
                                color={Colors.primary}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => {
                            dispatch(productActions.addToFav(itemData.item.id.toString()));
                       }}>
                            <Ionicons
                                name={'star-outline'}
                                size={23}
                                color={Colors.primary}
                            />
                        </TouchableOpacity>

                    }
                    <TouchableOpacity onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item, 1));
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
