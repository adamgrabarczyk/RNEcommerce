import {StyleSheet, View, Text, Pressable, Image, Alert, Platform, ActivityIndicator, Animated} from 'react-native';
import React, {useState, useRef} from 'react';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary, } from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import {PERMISSION_TYPE, REQUEST_PERMISSION_TYPE} from '../../permissions/permissions';
import {check, request, RESULTS, openSettings} from 'react-native-permissions';
import ModalImagePicker from '../user/ModalImagePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';

const UserAvatarPicker = (props) => {

    const defaultImage = require('../../images/avatar.jpeg');
    const userImage = useSelector(state => state.auth.avatar);
    const userImagePath = useSelector(state => state.auth.avatarPath);
    const userImageUrl = ({uri: userImage});
    const userId = useSelector(state => state.auth.user);

    const [modalVisible, setModalVisible] = useState(false);
    const [uploading, setUploading] = React.useState(null);
    const [imageUri, setimageUri] = React.useState('');
    const [imageUriGallary, setimageUriGallary] = React.useState(userImage === null ? defaultImage : userImageUrl && userImage !== '' ? userImageUrl : defaultImage);
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();


  const checkPermission = async (type): Promise<boolean> => {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]

        if (!permissions) {
            return true
        }
        try {
            const result = await check(permissions);
            if (result === RESULTS.GRANTED && (permissions === 'android.permission.CAMERA' || permissions ===  'ios.permission.CAMERA')) {
                takePhotoCameraOrGallery(permissions);
            } else if (result === RESULTS.GRANTED && (permissions === 'android.permission.WRITE_EXTERNAL_STORAGE' || permissions ===  'ios.permission.PHOTO_LIBRARY')) {
                takePhotoCameraOrGallery(permissions);
            } else if (result === 'blocked') {
                Alert.alert(
                    "Ustawienia",
                    "Nie wyraziłeś zgody na dostęp do tej akcji. Zmień ustawienia",
                    [
                        {
                            text: "Anuluj",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK, zmień ustawienia", onPress: () => {openSettings()} }
                    ]
                );
            } else {
                return requestPermission(permissions);
            }
        } catch (e) {
            return false;
        }
    }


     const requestPermission = async (permissions): Promise<boolean> => {

        try {
            const result = await request(permissions);
            if (result === RESULTS.GRANTED && (permissions === 'android.permission.CAMERA' || permissions ===  'ios.permission.CAMERA')) {
                takePhotoCameraOrGallery(permissions);
            } else if (result === RESULTS.GRANTED && (permissions === 'android.permission.WRITE_EXTERNAL_STORAGE' || permissions ===  'ios.permission.PHOTO_LIBRARY')) {
                takePhotoCameraOrGallery(permissions);
            }
        } catch (e) {
            return false
        }
    };

    const takePhotoCameraOrGallery = (permissions) => {

        setModalVisible(false);
        console.log('fem')

        let option = {
            storageOption: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true
        }

        let images = [];

        function listFilesAndDirectories(reference, pageToken) {
            return reference.list({ pageToken }).then(result => {

                result.items.forEach(ref => {
                    images.push(ref.fullPath)
                });

                if (result.nextPageToken) {
                    return listFilesAndDirectories(reference, result.nextPageToken);
                }

                return Promise.resolve();
            });
        }

        const reference = storage().ref('images/' + userId + '/');


        listFilesAndDirectories(reference).then(() => {
            console.log('Finished listing');
        });
                let lunchCameraOrGallery = (permissions === 'android.permission.CAMERA' || permissions ===  'ios.permission.CAMERA') ? launchCamera : null ||
                    (permissions === 'android.permission.WRITE_EXTERNAL_STORAGE' || permissions ===  'ios.permission.PHOTO_LIBRARY') ? launchImageLibrary  : null;
        setIsLoading(true);
        fadeIn();
        lunchCameraOrGallery(option, async response => {
                        console.log('Response = ', response);
                        if (response.didCancel) {
                            console.log('User cancelled action');
                            fadeOut();
                            setTimeout(() => {
                                setIsLoading(false);
                            }, 2000);
                        } else if (response.errorMessage) {
                            console.log('Error message: ' + response.errorMessage);
                            fadeOut();
                            setTimeout(() => {
                                setIsLoading(false);
                            }, 2000);
                        }else if (response.errorCode) {
                            console.log('Error message: ' + response.errorCode);
                            fadeOut();
                            setTimeout(() => {
                                setIsLoading(false);
                            }, 2000);
                        } else {
                            const source = {uri: `data:image/jpeg;base64,` + response.assets[0].base64};
                            setimageUriGallary(source);
                            const imagePath = response.assets[0].uri;

                            let fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
                            setUploading(true);

                            try {
                                await storage().ref('images/' + userId + '/' + fileName).putFile(imagePath);
                                setUploading(false);
                                setimageUri('images/' + userId + '/' + fileName);
                            } catch (e) {
                                console.log(e);
                            }
                            const imgDirectory = 'images/' + userId + '/' + fileName;
                            const url = await storage().ref(imgDirectory).getDownloadURL();

                            if (images.length > 0) {
                                images.forEach(ref => {
                                    const reference = storage().ref(ref);

                                    reference.delete().then(function () {
                                        console.log('Old photo deleted')
                                    }).catch(function (error) {
                                        console.log(error);
                                    });
                                });
                            }
                            setimageUriGallary({uri: url});
                            dispatch(authActions.setAvatar(url, imgDirectory));
                            fadeOut();
                            setTimeout(() => {
                                setIsLoading(false);
                            }, 2000);
                        }
                    } );
                }



    const deleteAvatar = () => {
        setIsLoading(true);
        setModalVisible(false);
        const ref = storage().ref(
            imageUri === '' ? userImagePath : console.log('') ||
            userImagePath === undefined ? imageUri : imageUri ||
            userImagePath !== imageUri ? imageUri : userImagePath);

        ref.delete().then(function() {
            setIsLoading(false);
            alert('deleted')
            setimageUriGallary(defaultImage);
        }).catch(function(error) {
            console.log(error);
        });
        dispatch(authActions.deleteAvatar(imageUriGallary));
    }

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setModalVisible(true)}
            style={styles.addAvatar}
                       disabled={isLoading || uploading ? true : false}
            >
                    <Image
                    source={imageUriGallary}
                    style={{
                        height: 125,
                        width: 125,
                        borderRadius: 100,
                        borderWidth: 6,
                        borderColor: 'white',
                    }}
                />
                <View style={styles.iconContainer}>
                <Ionicons
                    style={styles.addIcon}
                    name={'add'}
                    size={25}
                    color={Colors.primary}
                />
                </View>
                {
                    isLoading ?

                        <Animated.View style={[styles.loading,
                            {
                                opacity: fadeAnim
                            }
                        ]}>
                            <ActivityIndicator size='large' color={Colors.primary}/>
                        </Animated.View>
                :
                        null
                }
            </Pressable>
            <ModalImagePicker
                modalVisible={modalVisible}
                openModalButtonPress={() => setModalVisible(true)}
                lunchCamera={() => checkPermission(PERMISSION_TYPE.camera)}
                lunchLibrary={ () => checkPermission(PERMISSION_TYPE.gallery)}
                hideModalButton={() => setModalVisible(!modalVisible)}
                remveAvatar={
                    imageUriGallary !== defaultImage ?
                        <Pressable
                        style={styles.button}
                        onPress={deleteAvatar}
                    >
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                            size={23}
                            color={Colors.primary}
                        />
                        <Text style={styles.textStyle}>Usuń</Text>
                    </Pressable>
                        :
                        null
                }
            />
        </View>
    );
}

export default UserAvatarPicker;
const styles = StyleSheet.create({

    container: {},

    iconContainer: {
            width: 25,
            height: 25,
            position: 'absolute',
            right: 10,
            bottom: 8,
            borderRadius: 10,
            backgroundColor: 'white',
            textAlign: 'center'
    },

    addIcon: {

    },
    editIcon: {},

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

    addAvatar: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    loading: {
        position: 'absolute',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(177, 187, 201, 0.3)',
        height: 125,
        width: 125,
        borderRadius: 100,
        borderColor: 'white'
    },
    fadingContainer: {
        padding: 20,
        backgroundColor: "powderblue"
    },
    fadingText: {
        fontSize: 28
    },

});


