import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FavouriteOverviewScreen from './shop/FavouriteOverviewScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as productActioncs from '../store/actions/products';
import Spinner from '../components/UI/Spinner';



const Favourite = props => {
    const dispatch = useDispatch();
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        dispatch(productActioncs.fetchFavs()).then(
            () => {
                setLoading(false);
            }
        );
    }, [dispatch]);

    if (loading) {
        return <Spinner
            spinnerSize={'fullScreen'}
        />
    }

    return(
<View style={styles.container}>
       {   userFavProducts.length > 0 ?
   <FavouriteOverviewScreen {...props}/>
            :
            <View style={styles.noFavTextContainer}>
                <Text style={styles.noFavText}>nie masz polubionych produktów</Text>
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

    noFavTextContainer: {
        textAlign: 'center'
    },

    noFavText: {

    }
});



