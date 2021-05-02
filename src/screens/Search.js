import React, {useEffect, useState} from 'react';
import {
    Text, StyleSheet, TouchableOpacity, ScrollView, View, ActivityIndicator, FlatList, Platform, Image

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
    const newData = useSelector(state => state.products.newData);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);




    const selectItemHandler = (id, name) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: name

        });
    }

    return (
        <ScrollView>
            <View style={styles.filterButtonContainer}>
            <TouchableOpacity
                style={styles.filterButton}
            onPress={() => alert('pokaz filtry')}
            >
                <Ionicons
                    name={Platform.OS === 'android' ? 'options' : 'ios-options'}
                    size={25}
                    color={Colors.primary}
                />
                <Text style={styles.filter}>filtry</Text>
            </TouchableOpacity>
            </View>


            <Text onPress={() => {
                console.log(phrase)
            }}>{phrase.searchPhrase}</Text>
            <Text>{phrase.inputFocus.toString()}</Text>


            <Text onPress={() => {
                console.log(newData)
            }}>data</Text>

            {
                products.filter(
                product => (
                    phrase.searchPhrase === '' ? true
                        :
                        [
                            product.name,
                            product.desc
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
                        image={product.image}
                        title={product.name}
                        price={product.price}
                        description={product.desc}
                        onSelect={() => {
                            selectItemHandler(product.id, product.name);
                        }}
                    >
                        <TouchableOpacity onPress={ () => {
                            selectItemHandler(product.id, product.name);
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
    },

    filterButtonContainer: {
        width: 450,
        height: 35,
        backgroundColor: 'white',

    },

    filterButton: {
        marginTop: 3,
        marginLeft: 15,
        flexDirection: 'row'
    },

    filter: {
        marginLeft: 20,
        marginTop: 4,
        color: Colors.primary,
        fontSize: 17
    },

    image: {
        width: '100%',
        height: 300
    }

});
