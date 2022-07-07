import {StyleSheet, View, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';

const Ellipse = (props) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;



    useEffect(() => {

        const fadeIn = () => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            }).start();

        };

       fadeIn();
    },[])

    return (
        <Animated.View style={[styles.container, props.ellipse, {
            opacity: fadeAnim
        }]}>
        </Animated.View>
    )

}

export default Ellipse;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderWidth: 6,
        borderRadius: 100,
        borderColor: '#706EFD',
    },
});


