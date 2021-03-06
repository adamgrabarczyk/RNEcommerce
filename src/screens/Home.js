import React from 'react';
import {
    View,
    Text, StyleSheet,Button
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ProductOverviewScreen from './shop/ProductOverviewScreen';




const Home = (props, { navigation }) => {

    return(
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
            <FontAwesome5 name={'comments'} size={100} color={'red'} solid/>
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

// const styles = StyleSheet.create({
//
//     product: {
//     }
// }


export default Home;


