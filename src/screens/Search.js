import React, {useEffect, useState} from 'react';
import {
    Text, StyleSheet, TouchableOpacity, ScrollView, View, Modal, Pressable,  ActivityIndicator, FlatList, Platform, Image

} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../components/shop/ProductItem';
import * as productActions from '../store/actions/products';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constans/Colors';
import * as cartActions from '../store/actions/cart';

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


const Search = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const phrase = useSelector(state => state.search);
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const newData = useSelector(state => state.products.newData);
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const selectItemHandler = (id, name) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: name

        });
    }

    return (
        <ScrollView>
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

                                                    onPress={() => alert(filter.label)}
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


            <Text onPress={() => {
                console.log(phrase)
            }}>{phrase.searchPhrase}</Text>
            <Text>{phrase.inputFocus.toString()}</Text>


            <Text onPress={() => {
                console.log(newData)
            }}>data</Text>

            {
                products.filter(
                product => (
                    phrase.searchPhrase === '' ? true
                        :
                        [
                            product.name,
                            product.desc
                        ].map(
                            phr => phr.toLowerCase()
                        ).some(
                            phr => phr.includes(
                                phrase.searchPhrase.toLowerCase()
                            )
                        )
                       )
            ).map(
                product => (
                    <ProductItem
                        key={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        description={product.desc}
                        onSelect={() => {
                            selectItemHandler(product.id, product.name);
                        }}
                    >
                        <TouchableOpacity onPress={ () => {
                            selectItemHandler(product.id, product.name);
                        }}><Text style={styles.actionsButton}>View Details</Text></TouchableOpacity>
                        { userFavProducts.find(prod => prod.id === product.id) ?
                            <TouchableOpacity onPress={() => {
                                dispatch(productActions.deleteFromFav(product.id.toString()));
                            }}>
                                <Ionicons
                                    name={'star-sharp'}
                                    size={23}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => {
                                dispatch(productActions.addToFav(product.id.toString()));
                            }}>
                                <Ionicons
                                    name={'star-outline'}
                                    size={23}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>

                        }
                        <TouchableOpacity onPress={() => {
                            dispatch(cartActions.addToCart(product));
                        }}><Text style={styles.actionsButton} >To cart</Text></TouchableOpacity>
                    </ProductItem>
                )
            )}

        </ScrollView>
    );
}



export default Search;


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
