import React from 'react';
import {
    View,
    Text, StyleSheet,

} from 'react-native';
import Counter from '../components/Counter';




const Home = () => {

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Counter/>
            <Text>Home!</Text>
        </View>
    )
}



export default Home;


