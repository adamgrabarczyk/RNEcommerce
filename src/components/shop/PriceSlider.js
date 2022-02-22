import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as searchActions from '../../store/actions/search';

const PriceSlider = props => {
    const dispatch = useDispatch();
    const priceValue = useSelector(state => state.search.filteredPrice);
    const [slideCompletionValue, setSlideCompletionValue] = useState(0);
    const [slideCompletionCount, setSlideCompletionCount] = useState(0);


    return (
        <View
            style={styles.priceContainer}
        >
            <Slider
                style={styles.slider}
                value={priceValue}
                minimumValue={50}
                maximumValue={10000}
                step={1}
                minimumTrackTintColor="#3e8a6f"
                maximumTrackTintColor="#3e8a6f"
                onValueChange={value => {
                    dispatch(searchActions.priceFilter(value, slideCompletionValue))
                }}
                onSlidingComplete={value => {
                    setSlideCompletionValue(value),
                        setSlideCompletionCount(slideCompletionCount + 1)
                }
                }
            />

            <Text>
                Cena do:{' '} {priceValue} zł
            </Text>
        </View>
    );
}

export default PriceSlider;

const styles = StyleSheet.create({
    modalContentText: {
        marginTop: 40,
        color: "black",
        fontSize: 16,
        marginBottom: 15,
    },

    priceContainer: {
        width: 350,
        alignItems: 'center'
    },
    slider: {
        width: 340,
        height: 40,
        margin: 25
    }
});


