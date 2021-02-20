import React from 'react';
import {
    View,
    Text, StyleSheet,Button

} from 'react-native';
import Counter from '../components/Counter';
import ProductOverviewScreen from './shop/ProductOverviewScreen';




const Home = ({ navigation }) => {

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Counter/>
            <Text>Home!</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />

            <ProductOverviewScreen/>
        </View>
    )
}



export default Home;


