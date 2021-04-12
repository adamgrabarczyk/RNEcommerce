import React from 'react';
import {
    View,
    Text, StyleSheet,Button
} from 'react-native';


import ProductOverviewScreen from './shop/ProductOverviewScreen';
import {useSelector} from 'react-redux';




const Home = (props, { navigation }) => {

    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);

    return(
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>Home!</Text>
            <Text>Home!</Text>
            <Button
                title="show fav"
                onPress={() => {
                    console.log('undar table from home')
                    console.log(userFavProducts)
                }
                }
            />

            <Button
                title="ProductDetails"
                onPress={() => navigation.navigate('ProductDetails')}
            />

            <ProductOverviewScreen {...props}/>
        </View>
    )
}

const styles = StyleSheet.create({

    text: {
        fontFamily: 'OpenSans-SemiBoldItalic'
    }
})


export default Home;


