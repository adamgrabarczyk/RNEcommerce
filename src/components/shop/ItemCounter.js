import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, TextInput} from 'react-native';

const ItemCounter = props => {


    return (

            <View style={styles.itemData}>
                <View
                    style={props.counterContainer}
                >
                    <View
                        style={props.counterBox}
                    >
                        <TouchableOpacity
                            onPress={props.onRemove}
                            disabled={props.quantity <= 1}
                        >
                            <Text
                                style={props.minus}
                            >{props.subtractItem}</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                    >
                        {
                            props.input == true ?
                                <TextInput
                                    style={styles.quantity}
                                    value={props.quantity}
                                    defaultValue={props.quantity}
                                    onChangeText={props.getValue}
                                    keyboardType="number-pad"
                                    onBlur={props.checkValue}
                                    placeholder="1"
                                />
                                :
                                <Text>{props.quantity} szt.</Text>
                        }
                    </View>
                    <View
                        style={props.counterBox}
                    >
                        <TouchableOpacity
                            onPress={props.onAdd}
                        >
                            <Text
                                style={props.plus}
                            >{props.add}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

    )

};

const styles = StyleSheet.create({

    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        padding: 5,
    },
    quantity: {
        textAlign: 'center',
        width: 30,
        margin: 10,
    },

    mainText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16
    },


    deleteButton: {
        marginLeft: 20
    },

    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'black'
    },

    plusMinus: {
        textAlign: 'center',
        width: 30,
        margin: 10,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: 'black'

    },
    disabledMinus: {
        textAlign: 'center',
        width: 30,
        margin: 10,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: 'black',
        color: 'grey'

    },

    inputQty: {
        width: 30,
        textAlign: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'black'
    },
    counterBox: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'black'
    }

});

export default ItemCounter;
