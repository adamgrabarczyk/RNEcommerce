import React, {useCallback, useEffect, useState} from 'react';
import { useScrollToTop } from '@react-navigation/native';
import {
    Text, StyleSheet, TouchableOpacity, ScrollView, View,RefreshControl, ActivityIndicator

} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../components/shop/ProductItem';
import * as productActions from '../store/actions/products';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constans/Colors';
import * as cartActions from '../store/actions/cart';
import FilterControls from '../components/shop/FilterControls';
import * as productActioncs from '../store/actions/products';

const filters = {
    phrase: (product, searchPhrase) => [
        product.name,
        product.mark,
        product.availability,
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

    subcategory_tv: product => product.subcategory[0].subcategory_title === 'Telewizory',
    subcategory_fridge: product => product.subcategory[0].subcategory_title === 'Lodowki',
    subcategory_clothing: product => product.subcategory[0].subcategory_title === 'Odziez sportowa',
    subcategory_sport_equipment: product => product.subcategory[0].subcategory_title === 'Sprzęt sportowy',
    subcategory_car_lamp: product => product.subcategory[0].subcategory_title === 'Lampy',
    subcategory_brakes: product => product.subcategory[0].subcategory_title === 'Hamulce',
    subcategory_lamp: product => product.subcategory[0].subcategory_title === 'Lampy',
    subcategory_pictures: product => product.subcategory[0].subcategory_title === 'Obrazy',
    subcategory_shirts: product => product.subcategory[0].subcategory_title === 'Koszule',
    subcategory_trousers: product => product.subcategory[0].subcategory_title === 'Spodnie',
    subcategory_tools: product => product.subcategory[0].subcategory_title === 'Narzędzia',
    subcategory_garden_furniture: product => product.subcategory[0].subcategory_title === 'Meble ogrodowe',
    subcategory_remote_toys: product => product.subcategory[0].subcategory_title === 'Sterowane zdalnie',
    subcategory_plush_toys: product => product.subcategory[0].subcategory_title === 'Pluszowezd',


    mark_sony: product => product.mark === 'Sony',
    mark_brembo: product => product.mark === 'Brembo',
    mark_haier: product => product.mark === 'Haier',
    mark_kipsta: product => product.mark === 'Kipsta',
    mark_samsung: product => product.mark === 'Samsung',


    available_products: product => product.availability === 'true'


}

const Search = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const phrase = useSelector(state => state.search);
    const filterPrice = useSelector(state => state.search.filteredPrice);
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState();

    const ref = React.useRef(null);

    useScrollToTop(ref);


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
        dispatch(productActioncs.fetchFavs());
        availableProducts().then(
            () => {
                setLoading(false);
            }
        );
    }, [dispatch, availableProducts]);


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


    const availableSearchProducts = products.filter(
        product => phrase.activeFilterNames.map(
            filterName => filters[filterName]
        ).every(
            func => func(product, phrase.searchPhrase)
        )

    ).map(
        product => (
            <Text>{product.name}</Text>
        ));

    const selectItemHandler = (id, name) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: name

        });
    }

    return (
        <View style={styles.searchTabContainer}>
            <FilterControls
                activeFilterNames={phrase.activeFilterNames}
            />
        <ScrollView ref={ref} style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={availableProducts}
                        />
                    }
        >

            {
                availableSearchProducts.length > 0 ?

                products.filter(
                product => phrase.activeFilterNames.map(
                        filterName => filters[filterName]
                    ).every(
                        func => func(product, phrase.searchPhrase)
                    )

            ).filter(
                  product => product.price < filterPrice
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
                        }}><Text style={styles.actionsButton}>Zobacz</Text></TouchableOpacity>
                        { userFavProducts.find(prod => prod.id.toString() === product.id.toString()) ?
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
                            dispatch(cartActions.addToCart(product, 1));
                        }}><Text style={styles.actionsButton} >Do koszyka</Text></TouchableOpacity>
                    </ProductItem>
                )
            )
            :
                    <View style={styles.notFind}>
                        <Text style={styles.notFindText}>Nie znaleziono produktów spełniających kryteria wyszykiwania.</Text>
                    </View>
            }

        </ScrollView>
        </View>
    );
}



export default Search;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        display: 'flex',
    },

    notFind: {
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 300
    },

    notFindText: {
        fontSize: 15
    },

    searchTabContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

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
