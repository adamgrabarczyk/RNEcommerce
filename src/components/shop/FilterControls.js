import React, {useState} from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constans/Colors';
import * as searchActions from '../../store/actions/search';
import {useDispatch} from 'react-redux';

const categoryFilters = [
    {
        name: 'category_electronic',
        label: 'Elektronika',
        subcategory: 'Telewizory'
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
    const [activeFilter, setActiveFilter] = useState('');
    const [activeFilterName, setActiveFilterName] = useState('');
    const dispatch = useDispatch();

    let filerLabel;

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

                                        filerLabel = filter.label;
                                        const isActive = props.activeFilterNames.includes(filter.name)
                                        return(
                                            <TouchableOpacity
                                                key={filter.name}
                                                active={isActive}
                                                onPress={
                                                    () => {
                                                        dispatch(searchActions.categoryFilter(filter.name, !isActive));
                                                            console.log(filter.subcategory);
                                                            setActiveFilter(!isActive ? filter.label : '');
                                                            setActiveFilterName(!isActive ? filter.name : '');
                                                    }
                                                    }
                                                style={styles.filterButton}
                                            >
                                                <Text style={[styles.filterButtonText, isActive ? styles.activeButton : styles.deactivateButton]}>{filter.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                )
                            }
                        </View>
                    </View>
                </View>

            </Modal>

            <View
                style={styles.filterButton}
            >
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
            >
                <Ionicons
                    name={Platform.OS === 'android' ? 'options' : 'ios-options'}
                    size={25}
                    color={Colors.primary}
                />
                <Text style={styles.filterButtonTextPrev}>filtry</Text>
            </TouchableOpacity>
                {
                    activeFilter !== '' ?
                <View
                    style={styles.activeFilterContainer}
                >
                    <TouchableOpacity
                        style={styles.removeActiveFilterButton}
                    onPress={
                        () => {
                            dispatch(searchActions.removeFilter(activeFilterName));
                            setActiveFilter('');
                        }
                    }
                    >
                    <FontAwesome
                        name={'remove'}
                        size={20}
                        color={'#b0b0b0'}
                    />
                <Text style={styles.filter}>{activeFilter}</Text>
                    </TouchableOpacity>
                </View>
                        :
                        <View>
                        </View>
                }
            </View>

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

    removeActiveFilterButton: {
        marginLeft: 30,
        marginTop: 4,
        flexDirection: 'row'
    },

    activeFilterContainer: {
        marginLeft: 20,
    },

    filterButton: {
        marginTop: 3,
        marginLeft: 15,
        flexDirection: 'row'
    },

    filter: {
        color: Colors.primary,
        fontSize: 17
    },

    filterButtonTextPrev:{
        marginLeft: 30,
        marginTop: -22,
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

    filterButtonText: {
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
    },

    activeButton: {
        color: 'blue',
    },
    deactivateButton: {
        color: '#4e5354',
    }

});
