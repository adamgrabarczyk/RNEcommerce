import React, {useEffect, useState} from 'react';
import {
    Text, StyleSheet, TouchableOpacity, ScrollView, View, Modal, Pressable,  ActivityIndicator, FlatList, Platform, Image

} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../components/shop/ProductItem';
import * as productActions from '../store/actions/products';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constans/Colors';
import * as cartActions from '../store/actions/cart';
import FilterControls from '../components/shop/FilterControls';
import search from '../store/reducers/search';
import products from '../store/reducers/products';

const categoryFilters = [
    {
        name: 'category_electronic',
        label: 'Elektronika',
        subcategory: 'Telewizory'
    },
    {
        name: 'category_sport',
        label: 'Sport'
    },
    {
        name: 'category_car_parts',
        label: 'Części samochodowe'
    },
    {
        name: 'category_decoration',
        label: 'Dekoracje'
    },
    {
        name: 'category_clothes',
        label: 'Odzież'
    },
    {
        name: 'category_garden',
        label: 'Ogród'
    },
    {
        name: 'category_toys',
        label: 'Zabawki'
    }


];

const filters = {
    phrase: (product, searchPhrase) => [
        product.name,
        product.category_title,
        product.subcategory[0].subcategory_title
    ].map(
        phrase => phrase.toLowerCase()
    ).some(
        phrase => phrase.includes(
            searchPhrase.toLowerCase()
        )
    ),
    category_electronic: product => product.category_title === 'Elektronika',
    category_sport: product => product.category_title === 'Sport',
    category_car_parts: product => product.category_title === 'Czesci samochodowe',
    category_decoration: product => product.category_title === 'Dekoracje',
    category_clothes: product => product.category_title === 'Odziez',
    category_garden: product => product.category_title === 'Ogrod',
    category_toys: product => product.category_title === 'Zabawki',

    subcategory_tv: product => product.subcategory_title == 'Telewizory'
}

const Search = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const phrase = useSelector(state => state.search);
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const newData = useSelector(state => state.products.newData);
    const dispatch = useDispatch();


    const selectItemHandler = (id, name) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: name

        });
    }

    return (
        <ScrollView>
            <FilterControls
                activeFilterNames={phrase.activeFilterNames}
            />

            <Text onPress={() => {
                console.log(search.activeFilterNames)
            }}>{phrase.searchPhrase}</Text>
            <Text>{phrase.inputFocus.toString()}</Text>


            <Text onPress={() => {
                console.log(phrase.activeFilterNames)
            }}>filtry</Text>


            <Text onPress={() => {
                console.log(filters)
            }}>filtersy</Text>

            <Text onPress={() => {
                console.log(newData)
            }}>data</Text>

            {
                products.filter(
                product => phrase.activeFilterNames.map(
                        filterName => filters[filterName]
                    ).every(
                        func => func(product, phrase.searchPhrase)
                    )

            ).map(
                product => (
                    <ProductItem
                        key={product.id}
                        image={product.image}
                        name={product.name}
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
    },

    centeredView: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        backgroundColor: "white",
        // padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalView: {
        flexDirection: 'row',
        height: 100,
        width: '100%',
        backgroundColor: Colors.primary,
    },

    modalContent: {

    },

    button: {
        width: 40,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        textAlign: 'center',
        backgroundColor: "#3e8a6f",
        marginTop: 45,
        marginLeft: 15,
        width: 40,
        height: 40
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: 55,
        color: "white",
        marginBottom: 15,
        marginLeft: 130,
        fontSize: 20,
        fontWeight: '500'
    },
    modalContentText: {
        marginTop: 40,
        color: "black",
        fontSize: 20,
        fontWeight: '500'
    },

    filterButton2: {
        color: '#4e5354',
        margin: 2,
        fontSize: 18
    },

    filtersButtonsArea: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'left',
        marginLeft: -50,
        marginTop: 50
    }

});
