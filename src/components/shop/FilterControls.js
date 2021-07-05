import React, {useState} from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView, Slider} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constans/Colors';
import * as searchActions from '../../store/actions/search';
import {useDispatch, useSelector} from 'react-redux';

const categoryFilters = [
    {
        name: 'category_electronic',
        label: 'Elektronika',
        subcategory: [
            {
                name: 'subcategory_tv',
                label: 'Telewizory'
            },

            {
                name: 'subcategory_fridge',
                label: 'Lodówki'
            }
        ]
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

const markFilters = [
    {
        name: 'mark_sony',
        label: 'Sony',
    },
    {
        name: 'mark_brembo',
        label: 'Brembo'
    },
    {
        name: 'mark_haier',
        label: 'Haier'
    },
    {
        name: 'mark_kipsta',
        label: 'Kipsta'
    },
    {
        name: 'mark_samsung',
        label: 'Samsung'
    }
]



const FilterControls = (props) => {
    const [slideCompletionValue, setSlideCompletionValue] = useState(0);
    const [slideCompletionCount, setSlideCompletionCount] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const phrase = useSelector(state => state.search);

    const activeFil = phrase.activeFilterNames.filter(
        filter => filter !== 'phrase'
    );

    const newFil = categoryFilters.concat(markFilters);
    const filteredKeywords = newFil.filter((word) => activeFil.includes(word.name));


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
                        <View>
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

                    <View style={styles.modalContent}>
                        <View>
                            <Text style={styles.modalContentText}>Wybierz marke</Text>
                            <View
                                style={styles.filtersButtonsArea}
                            >

                                {
                                    markFilters.map(
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
                    <View
                   style={styles.priceContainer}
                    >
                        <Text style={styles.modalContentText}>Cena</Text>
                        <Slider
                            style={styles.slider}
                            value={sliderValue}
                            minimumValue={50}
                            maximumValue={2000}
                            step={1}
                            minimumTrackTintColor="#3e8a6f"
                            maximumTrackTintColor="#3e8a6f"
                            onValueChange={value => setSliderValue(value)}
                            onSlidingComplete={value => {
                                setSlideCompletionValue(value),
                                    setSlideCompletionCount(slideCompletionCount + 1)
                            }
                            }
                        />

                        <Text>
                            Completions: {slideCompletionCount} Value:{' '}
                            {slideCompletionValue + ' '}
                            Current Value:{' '} {sliderValue}
                        </Text>
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
                <View
                    style={activeFil.length > 0 ? styles.activeFilterIcon : styles.noFilters}
                >
                </View>
                <Text style={styles.filterButtonTextPrev}>filtry</Text>
            </TouchableOpacity>
                {
                    activeFil.length > 0 ?
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.activeFilterContainer}
                        >
                            {
                                filteredKeywords.map(
                                    filter =>
                                        (
                                            <View
                                                key={filter.name}
                                                style={styles.activeFilterBox}
                                            >
                                            <TouchableOpacity
                                                style={styles.removeActiveFilterButton}
                                                onPress={
                                                    () => {
                                                        const isActive = props.activeFilterNames.includes(filter.name)
                                                        dispatch(searchActions.categoryFilter(filter.name, !isActive));
                                                    }
                                                }
                                            >
                                                <FontAwesome
                                                    name={'remove'}
                                                    size={20}
                                                    color={'#b0b0b0'}
                                                />
                                                <Text style={styles.filter}>{filter.label}</Text>
                                            </TouchableOpacity>
                                            </View>
                                )
                                )
                            }
                        </ScrollView>
                        :
                        <View>
                                            <Text></Text>

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

    activeFilterIcon: {
        width: 7,
        height: 7,
        position: 'absolute',
        top: 4,
        left: 20,
        borderRadius: 10,
        backgroundColor: '#2196F3',
        textAlign: 'center'
    },

    noFilters: {
        backgroundColor: 'transparent'
    },

    filterButtonContainer: {
        width: 450,
        height: 35,
        backgroundColor: 'white'
    },

    removeActiveFilterButton: {
        // padding: 4,
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
    },

    priceContainer: {
        width: 400,
        alignItems: 'center'
    },

    slider: {
        width: 200,
        height: 40,
        margin: 25
    },

    activeFilterBox: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
        marginLeft: 20,
        padding: 3,
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row'

    }

});
