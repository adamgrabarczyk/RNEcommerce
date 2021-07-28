import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const ResetFiltersButton = props => {

    const activeFilters = useSelector(state => state.search.activeFilterNames);

    return (
        <TouchableOpacity
        onPress={props.resetFilters}
        disabled={activeFilters.length > 0 ? false : true}
        >
            <View style={activeFilters.length > 0 ?styles.resetFiltersContainer : styles.disabledResetFiltersContainer}>
                <Text style={styles.resetFiltersText}>Wyczyść filtry</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ResetFiltersButton;
const styles = StyleSheet.create({
    resetFiltersContainer: {
        backgroundColor: 'lightgrey',
        opacity: 0.5,
        width: 420,
        padding: 11,
        textAlign: 'center',
        alignItems: 'center'
    },

    disabledResetFiltersContainer: {
        backgroundColor: 'lightgrey',
        opacity: 0.25,
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


