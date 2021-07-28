import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {useState} from 'react';

const PriceSlider = props => {

    const [slideCompletionValue, setSlideCompletionValue] = useState(0);
    const [slideCompletionCount, setSlideCompletionCount] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);

    return (
        <View
            style={styles.priceContainer}
        >
            <Text style={styles.modalContentText}>Cena</Text>
            <Slider
                style={styles.slider}
                value={sliderValue}
                minimumValue={50}
                maximumValue={10000}
                step={1}
                minimumTrackTintColor="#3e8a6f"
                maximumTrackTintColor="#3e8a6f"
                onValueChange={value => setSliderValue(value)}
                onSlidingComplete={value => {
                    setSlideCompletionValue(value),
                        setSlideCompletionCount(slideCompletionCount + 1)
                }
                }
            />

            <Text>
                Completions: {slideCompletionCount} Value:{' '}
                {slideCompletionValue + ' '}
                Current Value:{' '} {sliderValue}
            </Text>
        </View>
    );
}

export default PriceSlider;

const styles = StyleSheet.create({
    modalContentText: {
        marginTop: 40,
        color: "black",
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 15
    },

    priceContainer: {
        width: 400,
        alignItems: 'center'
    },
    slider: {
        width: 200,
        height: 40,
        margin: 25
    },

});


