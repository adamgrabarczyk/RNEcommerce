import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FavouriteOverviewScreen from './shop/FavouriteOverviewScreen';
import {useSelector} from 'react-redux';
import Colors from '../constans/Colors';



const Favourite = props => {
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);


    return(
<View style={styles.container}>
       {   userFavProducts.length > 0 ?
   <FavouriteOverviewScreen {...props}/>
            :
            <View style={styles.noFavText}>
                <Text>nie masz polubionych produktów</Text>
            </View>
        }
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

    noFavText: {
        textAlign: 'center'
    }
});



