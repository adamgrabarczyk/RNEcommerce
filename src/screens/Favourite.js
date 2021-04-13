import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../components/shop/ProductItem';
import Colors from '../constans/Colors';
import * as productActions from '../store/actions/products';



const Favourite = props => {

   const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const dispatch = useDispatch();
    return(

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {   userFavProducts.length > 0 ?
        <FlatList
            data={userFavProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                    }}
                >
                    <TouchableOpacity onPress={() => {

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

