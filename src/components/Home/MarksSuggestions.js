import React from 'react';
import {
    StyleSheet,
    Text,Pressable
} from 'react-native';
import Colors from '../../constans/Colors';

const MarksSuggestions = (props) => {

    return(

        <Pressable onPress={props.details}
                   style={styles.container}
        >
            {props.logo}
            <Text>{props.mark}</Text>
        </Pressable>
    )
}




export default MarksSuggestions;


const styles = StyleSheet.create({

    container: {
        height: 150,
        width: 150,
        borderRadius: 125,
        borderWidth: 1,
        borderColor: Colors.accent,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width : 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    }



});
