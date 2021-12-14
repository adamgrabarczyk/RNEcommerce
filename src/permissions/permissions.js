import {PERMISSIONS} from 'react-native-permissions';

const PLATFORM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
};

const PLATFORM_GALLERY_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
};


export const REQUEST_PERMISSION_TYPE = {
    camera: PLATFORM_CAMERA_PERMISSIONS,
    gallery: PLATFORM_GALLERY_PERMISSIONS,
};

export const PERMISSION_TYPE = {
    camera: 'camera',
    gallery: 'gallery',
};

