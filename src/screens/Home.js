import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,ScrollView,
} from 'react-native';

import * as productActioncs from '../store/actions/products';
import {useDispatch, useSelector} from 'react-redux';
import * as userActions from '../store/actions/user';
import HomeHeader from '../components/Home/HomeHeader';
import BestDeals from '../components/Home/BestDeals';
import Suggestions from '../components/Home/Suggestions';
import Cutscene from '../components/Home/Cutscene';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constans/Colors';


const Home = ({navigation}, props) => {
    const dispatch = useDispatch();

    const products = useSelector(state => state.products.availableProducts);

    const bestDealsData = products.filter(
        product => parseInt(product.price) < 2500
    );

    const refrigeratorsData = products.filter(
        product => product.subcategory[0].subcategory_id === '3'
    );

    const [bestDeals, setBestDeals] = useState([]);
    const [refrigerators, setRefrigerators] = useState([]);


    useEffect(() => {
        dispatch(productActioncs.fetchFavs());
        dispatch(userActions._getUserAddresses());
        setBestDeals(bestDealsData);
        setRefrigerators(refrigeratorsData);
    }, [dispatch]);

    return(
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <HomeHeader
                navigation={() => navigation.jumpTo('Search')}
                navigateCategory={() => navigation.navigate('ChooseCategory')}
                />
            </View>
            <View style={styles.bestDeals}>
                <BestDeals
                    headerTitle={'Sprawdź najlepsze oferty'}
                    suggestions={
                        bestDeals.map(product=>(
                                <Suggestions
                                    key={product.id.toString()}
                                    imageUri={{uri: product.image}}
                                    imageName={product.name}
                                    details={() => navigation.navigate('ProductDetails', {
                                        productId: product.id,
                                        productTitle: product.name

                                    })}
                                />
                            )
                        )
                    }
                />
            </View>
            <View style={styles.cutceneContainer}>
                <Cutscene
               icon={<Ionicons
                   name={'logo-electron'}
                   size={40}
                   color={Colors.primary}
               />}
               iconWrapperText={'Elektronikia'}
               action={() => alert('blah')}
                />
                <Cutscene
                    icon={<Ionicons
                        name={'md-basketball-outline'}
                        size={40}
                        color={Colors.primary}
                    />}
                    iconWrapperText={'Sport'}
                    action={() => alert('blah')}
                />
                <Cutscene
                    icon={<Ionicons
                        name={'md-shirt-outline'}
                        size={40}
                        color={Colors.primary}
                    />}
                    iconWrapperText={'Odzież'}
                    action={() => alert('blah')}
                />
                <Cutscene
                    icon={<Ionicons
                        name={'md-car-sharp'}
                        size={40}
                        color={Colors.primary}
                    />}
                    iconWrapperText={'Części'}
                    action={() => alert('blah')}
                />
            </View>
            <View style={styles.bestDeals}>
                <BestDeals
                    headerTitle={'Lodówki najlepszej jakości'}
                    suggestions={
                        refrigerators.map(product=>(
                                <Suggestions
                                    key={product.id.toString()}
                                    imageUri={{uri: product.image}}
                                    imageName={product.name}
                                    details={() => navigation.navigate('ProductDetails', {
                                        productId: product.id,
                                        productTitle: product.name

                                    })}
                                />
                            )
                        )
                    }
                />
            </View>
        </ScrollView>
    )
}




export default Home;


const styles = StyleSheet.create({

    container: {
       flex: 1
    },
    headerContainer: {

    },

    bestDeals: {
        backgroundColor: '#dedede',
        marginTop: 20,
        marginBottom: 20
    },

    cutceneContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});
