import React from 'react';
import {
    StyleSheet,
    View, Text, TouchableOpacity, FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as productActions from '../../store/actions/products';
import * as cartActions from '../../store/actions/cart';


const CategoryScreen = (props) => {
    const { categoryName } = props.route.params;
    const products = useSelector(state => state.products.availableProducts);
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const dispatch = useDispatch();

    const categoryProducts= products.filter(
        product => product.category_desc === categoryName
    );

    const selectItemHandler = (id, name) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: name

        });
    }
    return(

        <View style={styles.container}>
            {
                categoryProducts.length > 0 ?
                    <FlatList
                        data={categoryProducts}
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
                                <TouchableOpacity onPress={() => {
                                    selectItemHandler(itemData.item.id, itemData.item.name);
                                }}><Text style={styles.actionsButton}>Zobacz więcej</Text></TouchableOpacity>
                                {userFavProducts.find(product => product.id === itemData.item.id) ?
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
                                }}><Text style={styles.actionsButton}>Do koszyka</Text></TouchableOpacity>
                            </ProductItem>
                        )}
                    />
                    :
                    <View style={styles.notFind}>
                        <Text style={styles.notFindText}>Nie znaleziono produktów w tej kategorii.</Text>
                    </View>
            }
        </View>
    )
}




export default CategoryScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },


    actionsButton: {
        color: Colors.accent
    },

    notFind: {
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 300
    },

    notFindText: {
        fontSize: 15
    },

});
