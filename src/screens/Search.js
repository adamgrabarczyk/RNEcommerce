import React from 'react';
import {
    Text, StyleSheet, TouchableOpacity, ScrollView

} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../components/shop/ProductItem';
import * as productActions from '../store/actions/products';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constans/Colors';
import * as cartActions from '../store/actions/cart';




const Search = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const phrase = useSelector(state => state.search);
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title

        });
    }

    return (
        <ScrollView>
            <Text onPress={() => {
                console.log(phrase)
            }}>{phrase.searchPhrase}</Text>
            <Text>{phrase.inputFocus.toString()}</Text>


            {
                products.filter(
                product => (
                    phrase.searchPhrase === '' ? true
                        :
                        [
                            product.title,
                            product.description
                        ].map(
                            phr => phr.toLowerCase()
                        ).some(
                            phr => phr.includes(
                                phrase.searchPhrase.toLowerCase()
                            )
                        )
                       )
            ).map(
                product => (
                    <ProductItem
                        image={product.imageUrl}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        onSelect={() => {
                            selectItemHandler(product.id, product.title);
                        }}
                    >
                        <TouchableOpacity onPress={ () => {
                            selectItemHandler(product.id, product.title);
                        }}><Text style={styles.actionsButton}>View Details</Text></TouchableOpacity>
                        { userFavProducts.find(prod => prod.id === product.id) ?
                            <TouchableOpacity onPress={() => {
                                dispatch(productActions.deleteFromFav(product.id.toString()));
                            }}>
                                <Ionicons
                                    name={'star-sharp'}
                                    size={23}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => {
                                dispatch(productActions.addToFav(product.id.toString()));
                            }}>
                                <Ionicons
                                    name={'star-outline'}
                                    size={23}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>

                        }
                        <TouchableOpacity onPress={() => {
                            dispatch(cartActions.addToCart(product));
                        }}><Text style={styles.actionsButton} >To cart</Text></TouchableOpacity>
                    </ProductItem>
                )
            )}

        </ScrollView>
    );
}



export default Search;


const styles = StyleSheet.create({

    actionsButton: {
        color: Colors.accent
    }
});
