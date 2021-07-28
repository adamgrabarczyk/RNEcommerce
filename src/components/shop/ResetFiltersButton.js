import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ResetFiltersButton = props => {
    return (
        <TouchableOpacity
        onPress={props.resetFilters}
        >
            <View style={styles.resetFiltersContainer}>
                <Text style={styles.resetFiltersText}>Wyczyść filtry</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ResetFiltersButton;
const styles = StyleSheet.create({
    resetFiltersContainer: {
        backgroundColor: 'lightgrey',
        opacity: 0.4,
        width: 420,
        padding: 11,
        textAlign: 'center',
        alignItems: 'center'
    },

    resetFiltersButton: {

    },

    resetFiltersText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 15
    }

});


