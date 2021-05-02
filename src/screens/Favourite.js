import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../components/shop/ProductItem';
import Colors from '../constans/Colors';
import * as productActions from '../store/actions/products';



const Favourite = props => {

   const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title

        });
    }

    return(

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {   userFavProducts.length > 0 ?
        <FlatList
            data={userFavProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.image}
                    title={itemData.item.name}
                    price={itemData.item.price}
                    onSelect={() => {
                    }}
                >
                    <TouchableOpacity onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.name);
                    }}><Text style={styles.actionsButton}>View Details</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        dispatch(productActions.deleteFromFav(itemData.item.id.toString()));
                    }}><Text style={styles.actionsButton}>Delete</Text></TouchableOpacity>
                </ProductItem>
            )}
        />
            :
            <View>
                <Text>nie masz polubionych produktów</Text>
            </View>
        }
    </View>

    )
}



export default Favourite;

const styles = StyleSheet.create({

    actionsButton: {
        color: Colors.accent
    }
});

