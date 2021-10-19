import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator ,View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();


        const availableProducts = useCallback(async () => {
            setError(null);
            setRefresh(true);
           try {
               await dispatch(productActions.fetchProducts());
           }catch (e) {
                setLoading(e)
           }
           setRefresh(false);
    }, [dispatch, setLoading, setError]);


        useEffect(() => {
            setLoading(true);
            availableProducts().then(
                () => {
                    setLoading(false);
                }
            );
        }, [dispatch, availableProducts]);


    const selectItemHandler = (id, name) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: name

        });
    }


    if (error) {
        return (
        <View>
            <Text>Wystąpił błąd</Text>
            <TouchableOpacity
            onPress={availableProducts}
            >
                <Text>Spróbój ponownie</Text>
            </TouchableOpacity>
        </View>
    )
    }

    if (loading) {
        return (
        <View>
            <ActivityIndicator
                style={styles.spinner}
                size='large'
                color={Colors.primary}
            />
        </View>
                )
    }

    if (!loading && products === 0) {
        return (
            <View>
                <Text>brak dostępnych produktów</Text>
            </View>
        )
    }

    return (
        <View>
              <FlatList
            onRefresh={availableProducts}
            refreshing={refresh}
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
        </View>
    );
};


export default ProductsOverviewScreen;


const styles = StyleSheet.create({

    actionsButton: {
        color: Colors.accent
    },

    spinner: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    }
});
