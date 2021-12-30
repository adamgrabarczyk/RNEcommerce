import {StyleSheet, ActivityIndicator, View} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';

const Spinner = () => {


    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator
                size='large'
                color={Colors.primary}
            />
        </View>
    );
}

export default Spinner;

const styles = StyleSheet.create({
    spinnerContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


