import React, { useState,  } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../constans/Colors';
import * as searchActions from '../../store/actions/search';



const SearchBar = props => {
    const phrase = useSelector(state => state.search);
    const dispatch = useDispatch();


    return(
        <View style={styles.searchInputContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder='szukaj'
                value={phrase}
                onChangeText={
                    phrase => dispatch(searchActions.getPhrase(phrase))
                }
                returnKeyType="go"
            />
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
    }


});

export default SearchBar;
