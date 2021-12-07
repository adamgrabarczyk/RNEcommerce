import { StyleSheet, View, Text, TouchableOpacity, Image, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary, } from 'react-native-image-picker';
import Colors from '../../constans/Colors';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";


const UserAvatarPicker = (props) => {

    const defaultImage = require('../../images/avatar.jpeg');
    const userImage = useSelector(state => state.auth.avatar);
    const userImagePath = useSelector(state => state.auth.avatarPath);
    const userImageUrl = ({uri: userImage});
    const userId = useSelector(state => state.auth.user);

    const [response, setResponse] = React.useState(null);
    const [uploading, setUploading] = React.useState(null);
    const [transformed, setTransformed] = React.useState(0);
    const [imageUri, setimageUri] = React.useState('');
    const [imageUriGallary, setimageUriGallary] = React.useState(userImage === null ? defaultImage : userImageUrl && userImage !== '' ? userImageUrl : defaultImage);
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();

    const requestGalletyPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Cool Photo App Gallery Permission",
                    message:
                        "Cool Photo App needs access to your photo galelry " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the gallery");
            } else {
                console.log("Gallery permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 400
    };

    const takePhotoCamera =  async() => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Cool Photo App Camera Permission",
                        message:
                            "Cool Photo App needs access to your camera " +
                            "so you can take awesome pictures.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn("You can use the camera");


                    launchCamera(options, response => {
                        console.warn('Response = ' + response);
                        if (response.didCancel) {
                            console.warn('User cancelled action')
                        } else if (response.errorMessage) {
                            console.warn('Error message: ' + response.errorMessage)
                        } else {
                            const source = {uri: `data:image/jpeg;base64,` + response.base64};
                            setimageUriGallary(source);
                        }
                    } );

                } else {
                    console.warn("Camera permission denied");
                    console.warn(granted);
                    console.warn(PermissionsAndroid.RESULTS.GRANTED);
                }
            } catch (err) {
                console.warn(err);
            }
        };


    const takePhotoGallery =  () => {

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


        launchImageLibrary(option, async response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled action')
            } else if (response.errorMessage) {
                console.log('Error message: ' + response.errorMessage)
            } else {
                const source = {uri: `data:image/jpeg;base64,` + response.assets[0].base64};
                setimageUriGallary(source);
                const imagePath = response.assets[0].uri;

                let fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
                setUploading(true);

                try {
                    await storage().ref('images/' + userId + '/'  + fileName).putFile(imagePath);
                    setUploading (false);
                    setimageUri('images/' + userId + '/'  + fileName);
                    alert('image uploaded!');
                } catch (e) {
                    console.log(e);
                }
                const imgDirectory = 'images/' + userId + '/'  + fileName;
                const url = await storage().ref(imgDirectory).getDownloadURL();

                if (images.length > 0) {
                    images.forEach(ref => {
                        const reference = storage().ref(ref);

                        reference.delete().then(function() {
                            console.log('Old photo deleted')
                        }).catch(function(error) {
                            console.log(error);
                        });
                    });
                }
                setimageUriGallary({uri: url});
                dispatch(authActions.setAvatar(url, imgDirectory));
            }
        } );

    }

    const deleteAvatar = () => {
        const ref = storage().ref(
            imageUri === '' ? userImagePath : console.log('') ||
            userImagePath === undefined ? imageUri : imageUri ||
            userImagePath !== imageUri ? imageUri : userImagePath);

        ref.delete().then(function() {
            alert('deleted')
            setimageUriGallary(defaultImage);
        }).catch(function(error) {
            console.log(error);
        });
        dispatch(authActions.deleteAvatar(imageUriGallary));
    }


    return (
        <View style={styles.container}>
            <Text onPress={() => takePhotoCamera()}>makePhoyo</Text>
            <Text onPress={() => requestCameraPermission()}>permission</Text>
            <Text onPress={() => requestGalletyPermission()}>permission gallery</Text>
            <Text onPress={deleteAvatar}>delete</Text>
            <TouchableOpacity
            onPress={() => {takePhotoGallery()}}
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
                    <MaterialIcons
                        style={styles.editIcon}
                        name={'edit'}
                        size={35}
                        color={Colors.primary}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default UserAvatarPicker;
const styles = StyleSheet.create({

    container: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    iconContainer: {
            width: 50,
            height: 50,
            position: 'absolute',
            // top: -5,
            left: 100,
            // borderRadius: 10,
            // backgroundColor: Colors.accent,
            textAlign: 'center'
    },

    editIcon: {
        // flex: 1
    }

});


