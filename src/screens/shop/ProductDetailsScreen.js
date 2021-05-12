import React from 'react';
import {
    View,
    Text, StyleSheet,Image, ScrollView, TouchableOpacity, TextInput

} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constans/Colors';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Counter from '../../components/Counter';

const ProductDetailsScreen = (props, {route, navigation}) => {

    const { productId } = props.route.params;
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));

    const dispatch = useDispatch();
return (
    <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: selectedProduct.image}}/>
        <View style={styles.actions}>
            <View style={styles.FavouriteSwitchContainer}>
                <View style={styles.FavouriteIconWrapper}>
                { userFavProducts.find(product => product.id === selectedProduct.id) ?
                    <TouchableOpacity onPress={() => {
                        dispatch(productActions.deleteFromFav(selectedProduct.id.toString()));
                    }}>
                        <Ionicons
                            name={'star-sharp'}
                            size={35}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        dispatch(productActions.addToFav(selectedProduct.id.toString()));
                    }}>
                        <Ionicons
                            name={'star-outline'}
                            size={35}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>

                }
                </View>
            </View>
        </View>
        <Text style={styles.price} onPress={console.log(productId)}>{selectedProduct.price} PLN</Text>
        <View style={styles.counterContainer}>
            <Counter/>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct))
        }}>
            <Text style={styles.buttonText}>Dodaj do koszyka</Text>
        </TouchableOpacity>
        <Text style={styles.description}>{selectedProduct.desc}</Text>
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
        backgroundColor: Colors.primary,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
      color: 'white'
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
    },

    FavouriteSwitchContainer: {
        width: 48,
        height: 48,
        position: 'absolute',
        top: -5,
        right: 30,
        borderRadius: 40,
        borderColor: 'grey',
        borderWidth: 1,
        textAlign: 'center',
        alignItems: 'center'
    },

    FavouriteIconWrapper: {
        margin: 2
    },

    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        width: 80,
        margin: 10
    },

    counterButton: {
        margin: 10
    }



});

export default ProductDetailsScreen;
