import React from 'react';
import {
    StyleSheet,
    View, Text, Platform, ScrollView
} from 'react-native';
import Colors from '../../constans/Colors';

const BestDeals = (props) => {

    return(
        <View style={[styles.BestDealsContainer, props.container]}>
            <View style={styles.BestDealsHeader}>
                <Text style={styles.BestDealsHeaderText}>{props.headerTitle}</Text>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {props.suggestions}
            </ScrollView>
        </View>
    )
}




export default BestDeals;


const styles = StyleSheet.create({

    BestDealsContainer: {
        flex: 1,
        width: '100%',
        borderColor: 'grey',
        color: '#403e3e',
        backgroundColor: '#dedede',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        paddingBottom: 25
    },
    BestDealsHeader: {
        width: '100%',
        backgroundColor: Colors.primary,
        marginBottom: 20,
        height: Platform.OS === 'android' ? 50 : 50,
        borderColor: 'grey',
        color: '#403e3e',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18
    },

    BestDealsHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "700",
    }

});
