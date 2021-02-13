import React from 'react';
import {
    View,
    Text, StyleSheet,

} from 'react-native';
import Counter from '../components/Counter';




const Favourite = () => {

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Counter/>
            <Text>Fav Tab</Text>
        </View>
    )
}



export default Favourite;


