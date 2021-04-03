import React from 'react';
import {View, Text, FlatList, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import ProductItem from '../components/shop/ProductItem';
import * as cartActions from '../store/actions/cart';
import Colors from '../constans/Colors';



const Favourite = props => {

   const userProducts = useSelector(state => state.products.userProducts)

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/*<Counter/>*/}
            {/*<Text>Fav Tab</Text>*/}

            <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
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

