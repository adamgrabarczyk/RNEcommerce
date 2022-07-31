import {StyleSheet, View, Text, Image, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import React from 'react';
import Ellipse from './Ellipse';
import EllipseWelcome from './EllipseWelcome';
import Device from '../../constans/Device';

const WelcomeBanner = (props) => {


        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <EllipseWelcome/>
                <View style={styles.shadow}>
                    <Image source={require('../../images/Rectangle4.png')} style={{width: '100%', top: -20}}/>
                    <View style={styles.left}></View>
                    <View style={styles.right}></View>
                </View>

                <Ellipse
                ellipse={styles.smallEllipse}
                />
                <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerText}>Witamy w</Text>
                <Text style={styles.bannerText}>Shopeq</Text>
            </View>
                <Ellipse
                    ellipse={styles.bigEllipse}
                />
            </View>
            </TouchableWithoutFeedback>
        )

}

export default WelcomeBanner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingBottom: Platform.OS === 'android' ? '100%' : 0
    },
    bannerTextContainer: {
        width: '100%',
        textAlign: 'center',
        margin: '10%',
        marginTop: 0,
        top: Device.height < 700 ? '35%': '50%'
    },

    bannerText: {
        color: 'white',
        fontSize:  Device.height < 700 ? 55 : 65,
        fontWeight: '700',
        fontStyle: 'normal'
    },

    smallEllipse: {
        width: 27,
        height: 27,
        left: 80,
        top: Device.height < 700 ? '10%': '30%',
    },

    bigEllipse: {
        width: 35,
        height: 35,
        left: 310,
        top: Device.height < 700 ? '100%': '130%',
    },
    shadow: {
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        minHeight: 50,
        top: Platform.OS === 'android' ? '15%' : '18%'
    },

    right: {
        position: 'absolute',
        minHeight: 50,
        width: '50%'
    },

    left: {
        minHeight: 50,
        width: '50%',
        position: 'relative'
    }
});


