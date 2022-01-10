import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';


import {INCREASE_COUNTER, DECREASE_COUNTER, RESET_COUNTER} from '../store/actions/counter';

class Counter extends Component<Props> {



    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        style={{margin: 5}}
                        onPress={() => this.props.increaseCounter()}>
                        <Text>+</Text>
                    </TouchableOpacity>
                    <Text style={{margin: 5}}>{this.props.counter.counter}</Text>
                    <TextInput/>
                    <TouchableOpacity
                        style={{margin: 5}}
                        onPress={() => this.props.decreaseCounter()}>
                        <Text>-</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text onPress={() => this.props.resetCounter()}>Reset</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


function mapStateToProps(state){
    return {
        counter: state.counter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        increaseCounter: () => dispatch({type: INCREASE_COUNTER}),
        decreaseCounter: () => dispatch({type: DECREASE_COUNTER}),
        resetCounter: () => dispatch({type: RESET_COUNTER})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

const styles = StyleSheet.create({
    container: {
        // flex: ,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
