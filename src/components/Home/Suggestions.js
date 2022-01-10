import React from 'react';
import {
    StyleSheet,
    View, Text, TouchableOpacity, Image
} from 'react-native';
import Colors from '../../constans/Colors';


const Suggestions = (props) => {

    return(

        <View style={styles.suggestionsContainer}>
            <View style={styles.suggestionsImageContainer}>
                <Image source={props.imageUri}
                       style={styles.suggestionsImage}
                />
            </View>

            <View style={styles.suggestionProductDetails}>
                <Text style={styles.suggestionProductName}>{props.imageName}</Text>
                <TouchableOpacity
                    style={styles.suggestionProductButton}
                    onPress={props.details}
                >
                    <Text style={styles.suggestionProductButtonText}>szczegóły</Text>
                </TouchableOpacity>
            </View>

        </View>
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

    },

    suggestionProductButton: {

    },

    suggestionProductButtonText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: '700',
        marginTop: 10
    }



});
