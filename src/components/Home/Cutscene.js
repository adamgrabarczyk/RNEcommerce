import React from 'react';
import {
    StyleSheet,
    View, Text, Pressable
} from 'react-native';


const Cutscene = (props) => {

    return(

        <Pressable
            onPress={props.action}
            style={styles.container}>
            <View style={styles.iconWrapper}>
                {props.icon}
                <Text style={styles.iconWrapperText}>{props.iconWrapperText}</Text>
            </View>
        </Pressable>
    )
}




export default Cutscene;


const styles = StyleSheet.create({

    container: {
        height: 180,
        width: 185,
        margin: 5,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width : 0, height: 2},
        shadowRadius: 8,
        elevation: 5,

    },
    iconWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconWrapperText: {

    }




});
