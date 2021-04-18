import React from 'react';
import {
    View,
    Text, StyleSheet, FlatList, TouchableOpacity,

} from 'react-native';
import Counter from '../components/Counter';
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
        <View>
            <Text>{phrase}</Text>
        <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
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
                        dispatch(cartActions.addToCart(itemData.item));
                    }}><Text style={styles.actionsButton} >To cart</Text></TouchableOpacity>
                </ProductItem>
            )}
        />
        </View>
    );
}



export default Search;


const styles = StyleSheet.create({

    actionsButton: {
        color: Colors.accent
    }
});
