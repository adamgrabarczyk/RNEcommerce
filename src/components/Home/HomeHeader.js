import React from 'react';
import {
    StyleSheet,
    View, Text, Platform, Pressable
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HomeHeader = (props) => {
    const userName = useSelector(state => state.auth.userName);

    return(
        <View style={styles.header}>
            <View style={styles.userNameContainer}>
            <Text style={styles.userNameText}>Cześć {userName}!</Text>
            </View>
            <Pressable
                onPress={props.navigation}
                style={styles.container}
            >
            <View style={styles.inputHeaderArea}>

                <Text style={styles.inputHeaderText}>
                    Czego szukasz?
                </Text>
                <Ionicons
                    name={'search'}
                    size={20}
                    color={'grey'}
                    style={styles.inputHeaderSearchIcon}
                />
            </View>
            </Pressable>

            <Pressable
                onPress={props.navigateCategory}
                style={styles.container}
            >
                <View style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>
                    KATEGORIE
                </Text>
                </View>
                <View>
                </View>
            </Pressable>
        </View>
    )
}




export default HomeHeader;


const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    userNameContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },

    userNameText: {
        fontSize: 20,
        margin: 30,
        color: '#5c5c5c'
    },

    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    inputHeaderArea: {
        width: '90%',
        height: Platform.OS === 'android' ? 40 : 30,
        borderColor: 'grey',
        color: '#403e3e',
        borderRadius: 5,
        backgroundColor: '#dbdbdb',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginTop: 2,
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 5
    },

    categoryButton: {
        width: '90%',
        height: Platform.OS === 'android' ? 40 : 35,
        borderColor: 'grey',
        color: '#403e3e',
        borderRadius: 5,
        backgroundColor: '#c2c2c2',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginTop: 2,
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 5
    },

    inputHeaderSearchIcon: {
        position: 'absolute',
        left: 100,
        top: Platform.OS === 'android' ? 9 : 3.5
    },

    inputHeaderText: {
        color: '#9c9c9c',
        borderRadius: 5,
        backgroundColor: '#dbdbdb',
        textAlign: 'center',
        margin: 20,
        marginTop: 2,
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 5
    },

    categoryButtonText: {
        color: Colors.primary,
        borderRadius: 5,
        backgroundColor: '#c2c2c2',
        textAlign: 'center',
        margin: 20,
        marginTop: 2,
        fontSize: 20,
        fontWeight: "700",
        marginVertical: 5,
        paddingHorizontal: 5
    }
});
