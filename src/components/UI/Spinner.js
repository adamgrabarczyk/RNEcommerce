import {StyleSheet, ActivityIndicator, View, Platform} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';

const Spinner = (props) => {

if (props.spinnerSize === 'fullScreen') {
    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator
                size='large'
                color={Colors.primary}
            />
        </View>
    )
} else if (props.spinnerSize === 'small') {
    return (
        <View style={styles.smallSpinnerContainer}>
            <ActivityIndicator
                size='small'
                color={Colors.primary}
            />
        </View>
    )
}
}

export default Spinner;

const styles = StyleSheet.create({
    spinnerContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallSpinnerContainer: {
        width: '100%',
        height:20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? 5 : 20,
        marginBottom: Platform.OS === 'ios' ? 10 : 20
    }
});


