import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Colors from '../../constans/Colors';



const UserAvatarPicker = (props) => {
    const [response, setResponse] = React.useState(null);
    const [imageUri, setimageUri] = React.useState('');
    const [imageUriGallary, setimageUriGallary] = React.useState(require('../../images/avatar.jpeg'));


    const options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 400

    };

    const takePhotoCamera =  () => {

        launchImageLibrary(options, response => {
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

    }

    const takePhotoGallery = () => {

        let option = {
            storageOption: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true
        }

        launchImageLibrary(option, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled action')
            } else if (response.errorMessage) {
                console.log('Error message: ' + response.errorMessage)
            } else {
                const source = {uri: `data:image/jpeg;base64,` + response.assets[0].base64};
                setimageUriGallary(source);
                console.log(source)
                console.log(imageUriGallary)
                console.log(response.assets[0].base64)
            }
        } );

    }

    return (
        <View style={styles.container}>

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


