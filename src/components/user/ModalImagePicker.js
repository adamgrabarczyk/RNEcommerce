import React from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
const ModalImagePicker = (props) => {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    props.hideModal
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.buttonsView}>
                        <Pressable
                            style={styles.button}
                            onPress={props.hideModalButton}
                        >
                            <Ionicons
                                name={'close'}
                                size={23}
                                color={Colors.primary}
                            />
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={props.lunchCamera}
                        >
                            <Ionicons
                                name={'camera'}
                                size={23}
                                color={Colors.primary}
                            />
                            <Text style={styles.textStyle}>Zrób zdjęcie</Text>
                        </Pressable>
                        </View>
                        <Pressable
                            style={styles.button}
                            onPress={props.lunchLibrary}
                        >
                            <Ionicons
                                name={'image-sharp'}
                                size={23}
                                color={Colors.primary}
                            />
                            <Text style={styles.textStyle}>Wybierz z galeri</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ModalImagePicker;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginBottom: 100,
        backgroundColor: "white",
        padding: 10,
        width: 390,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonsView: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        flexDirection: 'row'
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5,
        marginLeft: 10
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

