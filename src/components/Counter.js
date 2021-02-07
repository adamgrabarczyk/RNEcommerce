import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';


import {INCREASE_COUNTER, DECREASE_COUNTER, RESET_COUNTER} from '../store/actions/counter';

class Counter extends Component<Props> {



    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', width: 200, justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => this.props.increaseCounter()}>
                        <Text>Increase</Text>
                    </TouchableOpacity>
                    <Text>{this.props.counter.counter}</Text>
                    <TouchableOpacity onPress={() => this.props.decreaseCounter()}>
                        <Text>Decrease</Text>
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
        backgroundColor: '#F5FCFF',
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
