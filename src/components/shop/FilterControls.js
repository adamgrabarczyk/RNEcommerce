import React, {useState} from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constans/Colors';
import * as searchActions from '../../store/actions/search';
import {useDispatch, useSelector} from 'react-redux';
import ResetFiltersButton from './ResetFiltersButton';
import PriceSlider from './PriceSlider';
import AvailableProductsSwitch from './AvailableProductsSwitch';

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
                label: 'Lodowki'
            }
        ]
    },
    {
        name: 'category_sport',
        label: 'Sport',
        subcategory: [
            {
                name: 'subcategory_clothing',
                label: 'Odzież'
            },

            {
                name: 'subcategory_sport_equipment',
                label: 'Sprzęt sportowy'
            }
        ]
    },
    {
        name: 'category_car_parts',
        label: 'Czesci samochodowe',
        subcategory: [
            {
                name: 'subcategory_car_lamp',
                label: 'Lampy'
            },

            {
                name: 'subcategory_brakes',
                label: 'Hamulce'
            }
        ]
    },
    {
        name: 'category_decoration',
        label: 'Dekoracje',
        subcategory: [
            {
                name: 'subcategory_lamp',
                label: 'Lampy'
            },

            {
                name: 'subcategory_pictures',
                label: 'Obrazy'
            }
        ]
    },
    {
        name: 'category_clothes',
        label: 'Odzież',
        subcategory: [
            {
                name: 'subcategory_shirts',
                label: 'Koszule'
            },

            {
                name: 'subcategory_trousers',
                label: 'Spodnie'
            }
        ]
    },
    {
        name: 'category_garden',
        label: 'Ogród',
        subcategory: [
            {
                name: 'subcategory_tools',
                label: 'Narzędzia'
            },

            {
                name: 'subcategory_garden_furniture',
                label: 'Meble ogrodowe'
            }
        ]
    },
    {
        name: 'category_toys',
        label: 'Zabawki',
        subcategory: [
            {
                name: 'subcategory_remote_toys',
                label: 'Sterowane zdalnie'
            },

            {
                name: 'subcategory_plush_toys',
                label: 'Pluszowe'
            }
        ]
    }


];

const markFilters = [
    {
        name: 'mark_sony',
        label: 'Sony',
        subcategory: [
            {
                name: null,
                label: null
            }
        ]
    },
    {
        name: 'mark_brembo',
        label: 'Brembo',
        subcategory: [
            {
                name: null,
                label: null
            }
        ]
    },
    {
        name: 'mark_haier',
        label: 'Haier',
        subcategory: [
            {
                name: null,
                label: null
            }
        ]
    },
    {
        name: 'mark_kipsta',
        label: 'Kipsta',
        subcategory: [
            {
                name: null,
                label: null
            }
        ]
    },
    {
        name: 'mark_samsung',
        label: 'Samsung',
        subcategory: [
            {
                name: null,
                label: null
            }
        ]
    }
]



const FilterControls = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [markModalVisible, setMarkModalVisible] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('Wszystkie kategorie');
    const [markFilter, setMarkFilter] = useState('Wszystkie marki');
    const dispatch = useDispatch();
    const phrase = useSelector(state => state.search);
    const activeFilterPrice = useSelector(state => state.search.filteredPrice);
    const activeFil = phrase.activeFilterNames.filter(
        filter => filter !== 'phrase'
    );

    const newFil = categoryFilters.concat(markFilters);
    const filteredKeywords = newFil.filter((word) => activeFil.includes(word.name));
    const subCategoryData = filteredKeywords.find(
        data => data.label === categoryFilter
    );

    const subCat = filteredKeywords.map(
        data => data.subcategory.filter(
            d => activeFil.includes(d.name)
        )
    ).flat();

    let filerLabel;

    return (
        <View style={styles.filterButtonContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Ionicons
                                name={Platform.OS === 'android' ? 'close' : 'ios-close'}
                                size={25}
                                color={'white'}
                            />
                        </Pressable>
                        <Text style={styles.modalText}>Filtry</Text>
                    </View>

                    <ResetFiltersButton
                    resetFilters={() => {
                        dispatch({type: 'RESET_FILTERS'}),
                            setCategoryFilter('Wszystkie kategorie'),
                            setMarkFilter('Wszystkie marki')
                    }}
                    />

                    <ScrollView style={styles.modalContentContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.hintText}>Kategoria</Text>
                    <TouchableOpacity
                        style={styles.label}
                    onPress={() => setCategoryModalVisible(true)}
                    >
                        <View style={styles.categoryLabel}>
                    <Text style={styles.labelText}>{categoryFilter}</Text>
                        {
                            subCat.length > 0 ?
                                <Text style={styles.labelText}> / </Text>
                                :
                                <Text></Text>
                        }
                        {
                            subCat.length > 0 ?
                            <Text style={styles.labelText}>{subCat[0].label}</Text>
                                :
                                <Text></Text>
                        }
                        </View>
                        <View>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'chevron-forward-sharp' : 'ios-chevron-forward-sharp'}
                            size={26}
                            color={'white'}
                        />
                        </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={categoryModalVisible}
                            onRequestClose={() => {
                                setCategoryModalVisible(!categoryModalVisible);
                            }}
                        >
                            <View
                                style={styles.centeredView}
                            >
                                <View style={styles.modalView}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setCategoryModalVisible(!categoryModalVisible)}
                                    >
                                        <Ionicons
                                            name={Platform.OS === 'android' ? 'chevron-back-sharp' : 'ios-chevron-back-sharp'}
                                            size={25}
                                            color={'white'}
                                        />

                                    </Pressable>
                                    <Text style={styles.modalText}>Filtry</Text>
                                </View>
                                <View style={styles.modalContent}>
                                    <View style={styles.filtersButtonsContainer}>
                                        <Text style={styles.modalContentText}>Wybierz kategorie</Text>
                                        <View
                                            style={styles.filtersButtonsArea}
                                        >

                                            {
                                                categoryFilters.map(
                                                    filter => {

                                                        filerLabel = filter.label;
                                                        const isActive = props.activeFilterNames.includes(filter.name);
                                                        return(
                                                            <TouchableOpacity
                                                                key={filter.name}
                                                                active={isActive}
                                                                onPress={
                                                                    () => {
                                                                        dispatch(searchActions.categoryFilter(filter.name, !isActive));
                                                                         !isActive ? setCategoryFilter(filter.label) : setCategoryFilter('Wszystkie kategorie');
                                                                         isActive && phrase.activeSubCategory.length > 0 ? dispatch(searchActions.categoryFilter(phrase.activeSubCategory[0].name, !isActive)) && dispatch({ type: 'RESET_SUBCATEGORY' }) : console.log('blah');
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
                                    {
                                        categoryFilter !== 'Wszystkie kategorie' && subCategoryData !== undefined ?
                                    <View style={styles.filtersButtonsContainer}>
                                        <View style={styles.filtersButtonsArea}>
                                            <Text style={styles.modalContentText}>Wybierz podkategorie</Text>
                                            <View>
                                                { subCategoryData !== undefined ?
                                                    subCategoryData.subcategory.map(
                                                        filter => {
                                                            const isActive = props.activeFilterNames.includes(filter.name);
                                                            return (
                                                                <TouchableOpacity
                                                                    key={filter.name}
                                                                    active={isActive}
                                                                    onPress={
                                                                        () => {
                                                                            dispatch(searchActions.categoryFilter(filter.name, !isActive));
                                                                            dispatch(searchActions.subcategoryFilter(filter.name, !isActive, filter.label));
                                                                        }
                                                                    }
                                                                    style={styles.filterButton}
                                                                >
                                                                    <Text
                                                                        style={[styles.filterButtonText, isActive ? styles.activeButton : styles.deactivateButton]}
                                                                    >{filter.label}</Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    )
                                                    :
                                                    <View></View>
                                                }
                                            </View>
                                            </View>
                                    </View>
                                            :
                                            <View  style={styles.filtersButtonsContainer}>
                                            </View>
                                    }
                                </View>
                            </View>

                        </Modal>
                    </View>


                    <View style={styles.labelContainer}>
                        <Text style={styles.hintText}>Marka</Text>
                        <TouchableOpacity
                            style={styles.label}
                            onPress={() => setMarkModalVisible(true)}
                        >
                            <Text style={styles.labelText}>{markFilter}</Text>
                            <Ionicons
                                name={Platform.OS === 'android' ? 'chevron-forward-sharp' : 'ios-chevron-forward-sharp'}
                                size={26}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={markModalVisible}
                            onRequestClose={() => {
                                setMarkModalVisible(!markModalVisible);
                            }}
                        >
                            <View
                                style={styles.centeredView}
                            >
                                <View style={styles.modalView}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setMarkModalVisible(!markModalVisible)}
                                    >
                                        <Ionicons
                                            name={Platform.OS === 'android' ? 'chevron-back-sharp' : 'ios-chevron-back-sharp'}
                                            size={25}
                                            color={'white'}
                                        />

                                    </Pressable>
                                    <Text style={styles.modalText}>Filtry</Text>
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
                                                                        !isActive ? setMarkFilter(filter.label) : setMarkFilter('Wszystkie marki');
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

                            </View>

                        </Modal>
                    </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.hintText}>Cena</Text>
                    <PriceSlider/>
                    </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.hintText}>Dostępność</Text>
                        <AvailableProductsSwitch/>
                        </View>

                    </ScrollView>
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
                    style={activeFil.length > 0 || activeFilterPrice !== 10000 ? styles.activeFilterIcon : styles.noFilters}
                >
                </View>
                <Text style={styles.filterButtonTextPrev}>filtry</Text>
            </TouchableOpacity>
                {
                    activeFil.length > 0 ||  activeFilterPrice !== 10000 ?
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
                                                        filter.label === categoryFilter ? setCategoryFilter('Wszystkie kategorie') : console.log(filter.label);
                                                        filter.label === markFilter ? setMarkFilter('Wszystkie marki') : console.log(filter.label);
                                                        isActive && phrase.activeSubCategory.length > 0 && filter.subcategory[0 || 1].name === phrase.activeSubCategory[0].name ? dispatch(searchActions.categoryFilter(phrase.activeSubCategory[0].name, !isActive)) && dispatch({ type: 'RESET_SUBCATEGORY' }) : console.log('blah');
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

                            {
                                subCat.length > 0 ?
                                <View
                                    style={styles.activeFilterBox}
                                >
                                    <TouchableOpacity
                                        style={styles.removeActiveFilterButton}
                                        onPress={
                                            () => {
                                                const isActive = props.activeFilterNames.includes(subCat[0].name)
                                                dispatch(searchActions.categoryFilter(subCat[0].name, !isActive));

                                            }
                                        }
                                    >
                                        <FontAwesome
                                            name={'remove'}
                                            size={20}
                                            color={'#b0b0b0'}
                                        />
                                        <Text style={styles.filter}>{subCat[0].label}</Text>
                                    </TouchableOpacity>
                                </View>
                                    :
                                    <View>
                                    </View>
                            }

                            {
                                activeFilterPrice !== 10000 ?
                                    <View
                                        style={styles.activeFilterBox}
                                    >
                                        <TouchableOpacity
                                            style={styles.removeActiveFilterButton}
                                            onPress={
                                                () => {
                                                    dispatch({type: 'RESET_PRICE'})

                                                }
                                            }
                                        >
                                            <FontAwesome
                                                name={'remove'}
                                                size={20}
                                                color={'#b0b0b0'}
                                            />
                                            <Text style={styles.filter}>od {activeFilterPrice} zł</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                    </View>
                            }

                            {
                                activeFil.includes('available_products') ?
                                    <View
                                        style={styles.activeFilterBox}
                                    >
                                        <TouchableOpacity
                                            style={styles.removeActiveFilterButton}
                                            onPress={
                                                () => {
                                                    const isActive = props.activeFilterNames.includes('available_products')
                                                    dispatch(searchActions.categoryFilter('available_products', !isActive));
                                                }
                                            }
                                        >
                                            <FontAwesome
                                                name={'remove'}
                                                size={20}
                                                color={'#b0b0b0'}
                                            />
                                            <Text style={styles.filter}>Dostępne</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                    </View>
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
        flexDirection: 'row'
    },

    activeFilterContainer: {
        marginLeft: 20,
        marginRight: 25
    },

    filterButton: {
        marginTop: 3,
        marginLeft: 30,
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
        paddingTop: 40
    },

    modalContentContainer: {
      textAlign: 'center',
        paddingTop: 30
    },

    button: {
        textAlign: 'center',
        alignItems: 'center',
        width: 40,
        borderRadius: 20,
        padding: 6,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        textAlign: 'center',
        alignItems: 'center',
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
        fontWeight: '500',
        marginBottom: 15
    },

    filterButtonText: {
        color: '#4e5354',
        margin: 2,
        fontSize: 18
    },

    filtersButtonsArea: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    activeButton: {
        color: 'blue',
    },
    deactivateButton: {
        color: '#4e5354',
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

    },

    labelContainer: {
        marginTop: 30,
        margin: 30
    },

    label: {
        padding: 10,
        borderColor: Colors.primary,
        backgroundColor: '#3e8a6f',
        borderWidth: 1,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    labelText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    },
    categoryLabel: {
        flexDirection: 'row',
    },

    hintText: {
        fontSize: 16
    },

    filtersButtonsContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
    },


});
