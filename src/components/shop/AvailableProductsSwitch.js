import * as React from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import {useState} from 'react';
import * as searchActions from '../../store/actions/search';
import {useDispatch, useSelector} from 'react-redux';


const AvailableProductsSwitch = props => {
    const dispatch = useDispatch();
    const availableProducts = useSelector(state => state.search.activeFilterNames.includes('available_products'));
      const toggleSwitch = () => {
                previousState => !previousState;
        dispatch(searchActions.categoryFilter('available_products', !availableProducts));
    }


    return (
        <View style={styles.container}>
            <Text>Produkty dostępne od ręki</Text>
            <Switch
                trackColor={{ false: "#3e8a6f", true: "#3e8a6f" }}
                thumbColor={availableProducts ? "#f4f3f4" : "lightgrey"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={availableProducts}
            />
        </View>
    );
}

export default AvailableProductsSwitch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        width: 350,
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopWidth: 0.5,
        borderTopColor: 'black',
        borderBottomWidth: 0.5,
        borderBottomColor: 'black'
    }
});


