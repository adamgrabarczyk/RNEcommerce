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

export const categoryFilters = [
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
                label: 'Odziez sportowa'
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
                label: 'Zabawki sterowane zdalnie'
            },

            {
                name: 'subcategory_plush_toys',
                label: 'Pluszaki'
            }
        ]
    }


];

export const markFilters = [
    {
        name: 'mark_sony',
        label: 'Sony',
        logo: 'http://assets.stickpng.com/thumbs/5848242ecef1014c0b5e49c8.png',
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
        logo: 'https://logoeps.com/wp-content/uploads/2012/05/brembo-logo-vector-01.png',
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
        logo: 'https://freepngimg.com/thumb/logo/110054-logo-haier-free-download-png-hq-thumb.png',
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
        logo: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/072013/untitled-1_87.png?itok=EAtfoGDs',
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
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAaVBMVEX///8dHRs5OTisrKtycnFWVlTGxsbj4+KPj4709PQoKCYhIR9SUlGEhINnZ2ZkZGPU1NTq6uoyMjC2trahoaDNzc2ampnf39+8vLt5eXhISEZdXVtvb21AQD/4+PilpaRLS0kvLy2Li4pAvJU7AAAEqElEQVR4nO2YW3uqOhCGOSlyUhBRqBV3+/9/5MZkMpNECrarN2s933vRSghJvpnJZCAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/yxpXCVJUsXpbw2YtbtpwGTXZ78wVjxsblG5P1/Wem7L0HCwO98jppfWSlrH6XLPz0YydVWYxrxiKa1+6DT9LNWv0tzZ6L6FtqO+iM3Ncy6rWzb0LrTIa7kxSPNZWhNpfah+exaS3ewRS6Mk1te76WfkPkBCwmpGSGWPdVxSsg0dbnJHHBXuZ4W00yXbXtZlGUCW94qQPHsS4q0uWRCSuF1DcYn4NHyT/hJLDz9drCdnnrNNsy4kfIQd3Yyd2XJycjF+LUTbPbpkZMituZFai7EG2EjrMAX+sxB67j27/Oe0vyDk9iTkQ9sxCz51j4UNHxlbpJ6QXs+m7St+soRMu/X8pZBpyvt3hYS9L0Q3JxxjvLqvhLw/C9FrHPQsrSdEBeQHBeZ1TkjPS/+GkM0fCynuQbZTcGLQ4XnWEVdxfz2rNnYTqOihvNc4Qo51UOsRXSHDkpCH58tZIU2saL4WYnLTpvZu6MTaasccPCFbFXGd3titDj8yQUMDFpU7a8yLWhAymCtfyDqSqA+d3T7qxFq37qSkb6tccdeLTiNbCC1TSbHz/poQ1Vg0PxZSy0ngeKXWTQ395wNaL2KrIq5SCSEPXCHWCVvIwb4qREfrbl5It9UshJaTeIodN2tP5EGm77BEEnJSPlR/S2ozqXG0TtLwg928JqRWvj6O+zkhxstcucxxt3wixYhO3G/mfLt7QrrH35vyy2DaTJfs3RqQi541IVvdIU5+LCRIE5FSGOcd1OW0yfWxxmmLFq0cVSiRJ1/IlCylBFMp9SUh41GZ7g+ETBviwPOeqOlm1q9dffWEBFIZds9CpsiU++mLQijIZ88RSp6rQoKgM4FN9WHGsnRa+zAdQ5pVpGdzQoIxPtL99lUhmVWl+VkrXRPCbwkjnc8UCZSsei40TMgZIZybbmZhtGB6YUmD5uhMviakd2r2bwuRwiF1hFD7xdRcbG9zxeXiwasqqJxOOR++KGTqlspe/amQTz6RSQgZZ+RK3ewdI4QL+N28kMkEpzkhU+iOOoT41UdODkl3jpA9R4jUfD5k2Kg2OZP2yJWNNur2wRHSyWtHOy9k31xuzuSdviralIzE+UOE1L4QUwmaLfx10Wi/ddiW1/FdymD0hk2yUinSLqYHHTUnf0TKWuPRa+cjyzrLuewiIe/eMwsn+97tedQ1BSWtRAbPHeEpv9HmLJWqgsx7Q+TXZE9hxNXLRizYe0LsAiq0nDhD43wqyKmioPJfrW2wDStCKJuVvpCgdyYvpdpyPyTIy97GetycpGZXx/Zg0eJnlMbyCX9wsfcpJdreE0LxPPDsXKd1cq7nO/stO2ajFYMVJLaQ2BMS1FcjJa+WSka1uNN+E0Wb5P5rH+i6z0MZvV2r1v9Y0J2H62Zftd/5cNc8vvYN5+3ChwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBfzv/c2yzyOqD6GAAAAABJRU5ErkJggg==',
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
                                                        const isActive = props.activeFilterNames.includes(filter.name);
                                                        dispatch(searchActions.categoryFilter(filter.name, !isActive));
                                                        filter.label === categoryFilter ? setCategoryFilter('Wszystkie kategorie') : console.log(filter.label);
                                                        filter.label === markFilter ? setMarkFilter('Wszystkie marki') : console.log(filter.label);
                                                        isActive && phrase.activeSubCategory.length > 0 && filter.subcategory.some(sub => sub.name === phrase.activeSubCategory[0].name) ? dispatch(searchActions.categoryFilter(phrase.activeSubCategory[0].name, !isActive)) && dispatch({ type: 'RESET_SUBCATEGORY' }) : console.log(isActive);
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
        backgroundColor: '#4b49bf',
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
        backgroundColor: '#4b49bf',
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
