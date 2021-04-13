import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import ProductItem from '../components/shop/ProductItem';
import Colors from '../constans/Colors';



const Favourite = props => {

   const userFavProducts = useSelector(state => state.products.favoriteUserProducts);

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text onPress={() => {console.log(userFavProducts)}}>Fav Tab</Text>

            <FlatList
            data={userFavProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {}}
                >
                    <TouchableOpacity onPress={ () => {

                    }}><Text style={styles.actionsButton}>View Details</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {

                    }}><Text style={styles.actionsButton} >Delete</Text></TouchableOpacity>
                </ProductItem>
            )}
            />
        </View>
    )
}



export default Favourite;

const styles = StyleSheet.create({

    actionsButton: {
        color: Colors.accent
    }
});

