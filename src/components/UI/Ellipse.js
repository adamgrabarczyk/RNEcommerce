import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

const Ellipse = (props) => {


    return (
        <View style={[styles.container, props.ellipse]}>
        </View>
    )

}

export default Ellipse;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderWidth: 6,
        borderRadius: 100,
        borderColor: '#706EFD',
    },
});


