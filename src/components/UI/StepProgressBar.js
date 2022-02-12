import {View, StyleSheet} from 'react-native';
import React from 'react';

const StepProgressBar = (props) => {

    return (
        <View style={styles.container}>
            <View style={[styles.step, props.firstCompletedStep]}></View>
            <View style={[styles.step, props.secondCompletedStep]}></View>
            <View style={[styles.step, props.thirdCompletedStep]}></View>
            <View style={[styles.step, props.fourthCompletedStep]}></View>
        </View>
    );
};

export default StepProgressBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    step: {
        width: 50,
        height: 5,
        backgroundColor: 'grey',
        margin: 3
    }
});


