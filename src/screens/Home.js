import React from 'react';
import {
    View,
    Text, StyleSheet,Button
} from 'react-native';

import ProductOverviewScreen from './shop/ProductOverviewScreen';




const Home = ({ navigation }) => {

    return(
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />

            <ProductOverviewScreen/>
        </View>
    )
}

// const styles = StyleSheet.create({
//
//     product: {
//     }
// }


export default Home;


