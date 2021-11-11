import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FavouriteOverviewScreen from './shop/FavouriteOverviewScreen';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../constans/Colors';
import * as productActioncs from '../store/actions/products';



const Favourite = props => {
    const dispatch = useDispatch();
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);


    useEffect(() => {
        dispatch(productActioncs.fetchFavs());
    }, [dispatch]);



    return(
<View style={styles.container}>
       {   userFavProducts.length > 0 ?
   <FavouriteOverviewScreen {...props}/>
            :
            <View style={styles.noFavTextContainer}>
                <Text style={styles.noFavText}>nie masz polubionych produktów</Text>
            </View>
        }
    <Text onPress={() => console.log(userFavProducts)}>blah</Text>
</View>
    )
}



export default Favourite;

const styles = StyleSheet.create({

   container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
},

    noFavTextContainer: {
        textAlign: 'center'
    },

    noFavText: {

    }
});



