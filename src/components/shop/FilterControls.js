import React, {useState} from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import * as searchActions from '../../store/actions/search';
import {useDispatch} from 'react-redux';

const categoryFilters = [
    {
        name: 'category_electronic',
        label: 'Elektronika'
    },
    {
        name: 'category_sport',
        label: 'Sport'
    },
    {
        name: 'category_car_parts',
        label: 'Części samochodowe'
    },
    {
        name: 'category_decoration',
        label: 'Dekoracje'
    },
    {
        name: 'category_clothes',
        label: 'Odzież'
    },
    {
        name: 'category_garden',
        label: 'Ogród'
    },
    {
        name: 'category_toys',
        label: 'Zabawki'
    }


];

const FilterControls = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    return (
        <View style={styles.filterButtonContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>X</Text>
                        </Pressable>
                        <Text style={styles.modalText}>Filtry</Text>
                    </View>

                    <View style={styles.modalContent}>
                        <Text style={styles.modalContentText}>Wybierz kategorie</Text>
                        <View
                            style={styles.filtersButtonsArea}
                        >

                            {
                                categoryFilters.map(
                                    filter => {
                                        return(
                                            <TouchableOpacity
                                                key={filter.name}

                                                onPress={
                                                    () => dispatch(searchActions.categoryFilter(filter.name, true))
                                                    }
                                                style={styles.filterButton}
                                            >
                                                <Text style={[styles.filterButton2]}>{filter.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                )
                            }
                        </View>
                    </View>
                </View>

            </Modal>

            <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons
                    name={Platform.OS === 'android' ? 'options' : 'ios-options'}
                    size={25}
                    color={Colors.primary}
                />
                <Text style={styles.filter}>filtry</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FilterControls;

const styles = StyleSheet.create({

    actionsButton: {
        color: Colors.accent
    },

    filterButtonContainer: {
        width: 450,
        height: 35,
        backgroundColor: 'white',

    },

    filterButton: {
        marginTop: 3,
        marginLeft: 15,
        flexDirection: 'row'
    },

    filter: {
        marginLeft: 20,
        marginTop: 4,
        color: Colors.primary,
        fontSize: 17
    },

    image: {
        width: '100%',
        height: 300
    },

    centeredView: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        backgroundColor: "white",
        // padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalView: {
        flexDirection: 'row',
        height: 100,
        width: '100%',
        backgroundColor: Colors.primary,
    },

    modalContent: {

    },

    button: {
        width: 40,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        textAlign: 'center',
        backgroundColor: "#3e8a6f",
        marginTop: 45,
        marginLeft: 15,
        width: 40,
        height: 40
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: 55,
        color: "white",
        marginBottom: 15,
        marginLeft: 130,
        fontSize: 20,
        fontWeight: '500'
    },
    modalContentText: {
        marginTop: 40,
        color: "black",
        fontSize: 20,
        fontWeight: '500'
    },

    filterButton2: {
        color: '#4e5354',
        margin: 2,
        fontSize: 18
    },

    filtersButtonsArea: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        textAlign: 'left',
        marginLeft: -50,
        marginTop: 50
    }

});
