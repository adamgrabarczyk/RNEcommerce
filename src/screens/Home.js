import React from 'react';
import {
    View,
    Text, StyleSheet,Button
} from 'react-native';


import ProductOverviewScreen from './shop/ProductOverviewScreen';




const Home = (props, { navigation }) => {

    return(
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>Home!</Text>
            <Text>Home!</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
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


