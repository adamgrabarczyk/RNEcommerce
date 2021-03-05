import React from 'react';
import {
    View,
    Text, StyleSheet,

} from 'react-native';
import Counter from '../components/Counter';




const Search = () => {

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Counter/>
            <Text>Search Tab</Text>
        </View>
    )
}



export default Search;


