import React from 'react';
import {
    StyleSheet,
    View, Text, Image, Pressable
} from 'react-native';
import Colors from '../../constans/Colors';


const Suggestions = (props) => {

    return(

        <Pressable onPress={props.details} style={styles.suggestionsContainer}>
            <View style={styles.suggestionsImageContainer}>
                <Image source={props.imageUri}
                       style={styles.suggestionsImage}
                />
            </View>

            <View style={styles.suggestionProductDetails}>
                <Text style={styles.suggestionProductName}>{props.imageName.length <= 20 ? props.imageName : props.imageName.slice(0, 20) + '...'}</Text>
                <Text style={styles.suggestionProductPrice}>{props.price} PLN</Text>
            </View>

        </Pressable>
    )
}




export default Suggestions;


const styles = StyleSheet.create({

    suggestionsContainer: {
        height: 180,
        width: 185,
        margin: 10,
        borderWidth: 0.8,
        backgroundColor: 'white',
        borderColor: Colors.primary
    },

    suggestionsImageContainer: {
        flex: 2,
        alignItems: 'center'
    },

    suggestionsImage: {
        flex: 1,
        width: 160,
        height: 140,
        marginTop: 2,
        resizeMode: 'cover'
    },

    suggestionProductDetails: {
        flex: 1,
        paddingLeft: 10,
        paddingTop: 10
    },

    suggestionProductName: {
        color: 'black'
    },

    suggestionProductPrice: {
        marginTop: 5,
        color: Colors.accent
    }



});
