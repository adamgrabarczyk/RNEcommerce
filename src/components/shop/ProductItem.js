import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import Colors from '../../constans/Colors';



const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return(
        <View style={styles.product}>
            <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect } useForeground>
            <View>
           <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
           </View>
               <View style={styles.details}>
            <Text style={styles.title}>{props.name}</Text>
            <Text style={styles.price}>{props.price} PLN</Text>
            <Text style={styles.price}>{props.desc}</Text>
           </View>
            <View style={styles.actions}>
                {props.children}
            </View>
            </View>
        </TouchableCmp>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({

    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width : 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        width: 350,
        margin: 20,
        // overflow: 'hidden'
    },
    touchable: {

        overflow: 'hidden',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer :{
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    details: {
        alignItems: 'center',
        height: '15%'
    },
    title: {
        fontFamily: "OpenSans-Regular",
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontFamily: 'OpenSans-SemiBoldItalic',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    actionsButton: {
        color: Colors.accent
    }



});

export default ProductItem;
