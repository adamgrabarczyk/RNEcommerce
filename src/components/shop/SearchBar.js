import React, { useState,  } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';

import Colors from '../../constans/Colors';
import * as productActions from '../../store/actions/search';



const SearchBar = props => {
    const [phrase, onChangePhrase] = React.useState(null);
    const dispatch = useDispatch();

    return(
        <View style={styles.searchInputContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder='szukaj'
                value={phrase}
                onChangeText={onChangePhrase}
                // onFocus={this.props.handleInputFocus}
                // onBlur={this.props.handleInputBlur}
                returnKeyType="go"
            />
            <Text>{phrase}</Text>
        </View>

    )
};

const styles = StyleSheet.create({

    searchInputContainer: {
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    searchInput: {
        width: 280,
        height: 35,
        backgroundColor: 'white',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'red',
        marginVertical: 16,
        marginTop: 10,
        // marginLeft:
    }


});

export default SearchBar;
