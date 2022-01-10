import React, { useState } from 'react';
import {
    View,
    Text, StyleSheet,Image, ScrollView, TouchableOpacity

} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constans/Colors';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemCounter from '../../components/shop/ItemCounter';


const ProductDetailsScreen = (props) => {

    const [count, setCount] = useState(1);

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

            <ItemCounter
            input={true}
            quantity={isNaN(count) == true ? '1' : count.toString()}
            add={" + "}
            subtractItem={' - '}
            counterContainer={styles.counterContainer}
            counterBox={styles.counterBox}
            plus={styles.plusMinus}
            minus={count <= 1 ? styles.disabledMinus : styles.plusMinus}
            onAdd={() => {setCount(parseInt(count, 10) + 1)}}
            onRemove={() => setCount(count - 1)}
            getValue={
                (value) => {
                    const cleanValue = value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, 1);

                    if (value == 0) {
                        const cleanVal = value.replace(/[0]/gi, 1);
                        setCount(cleanVal.trim());
                    } else if(isNaN(value)) {
                        alert('put number here!')
                        setCount(1);
                    } else
                    setCount(parseInt(cleanValue, 10));
                }
            }
            checkValue={ () => {

                const value = count;
                if (value == '' || value == ' ' || isNaN(value)) {
                    setCount(1)}}
            }
            />
        <TouchableOpacity style={styles.button} onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct, count))
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
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'black'
    },

    counterButton: {
        margin: 10
    },

    counterBox: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'black'
    },
    plusMinus: {
        textAlign: 'center',
        width: 30,
        margin: 10,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: 'black'
    },
    disabledMinus: {
        textAlign: 'center',
        width: 30,
        margin: 10,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: 'black',
        color: 'grey'

    },


});

export default ProductDetailsScreen;
