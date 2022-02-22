import React from 'react';
import {
    StyleSheet,
    View, Text, TouchableOpacity, ScrollView
} from 'react-native';
import {categoryFilters} from '../../components/shop/FilterControls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';


const ChooseCategoryScreen = ({navigation}, props) => {
    let iconName;

    return(

        <ScrollView style={styles.container}>
           <View style={styles.buttonWrapperContainer}>
                <View style={styles.buttonWrapper}>
                {
                categoryFilters.map(
                    filter => {

                        if (filter.name === 'category_electronic') {
                            iconName = 'logo-electron';
                        } else if (filter.name === 'category_sport') {
                           iconName = 'md-basketball-outline';
                        } else if (filter.name === 'category_car_parts') {
                            iconName = 'md-car-sharp';
                        } else if (filter.name === 'category_decoration') {
                            iconName = 'ios-ribbon';
                        } else if (filter.name === 'category_clothes') {
                            iconName = 'md-shirt-outline';
                        } else if (filter.name === 'category_garden') {
                            iconName = 'ios-rose-sharp';
                        } else if (filter.name === 'category_toys') {
                            iconName = 'logo-ionitron';
                        }

                       return(
                            <TouchableOpacity
                                key={filter.name}
                                onPress={() => navigation.navigate('Category', {
                                    categoryName: filter.label,
                                })}
                                style={styles.button}
                            >
                                <Ionicons
                                    name={iconName}
                                    size={30}
                                    color={Colors.primary}
                                />
                                <Text style={styles.buttonText}>{filter.label}</Text>
                            </TouchableOpacity>
                        )}
                )
            }
                </View>
            </View>
        </ScrollView>
    )
}




export default ChooseCategoryScreen;


const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        flex: 1,
    },

    buttonWrapperContainer: {
        height: '100%',
        width: '100%',
    },

    buttonWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        margin: 30
    },

    button: {
        flexDirection: 'row',
        margin: 20,
        alignItems: 'flex-start'
    },

    buttonText: {
        fontSize: 20,
        margin: 5
    }




});
