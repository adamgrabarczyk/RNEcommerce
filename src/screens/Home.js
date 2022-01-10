import React, {useEffect} from 'react';
import {
    StyleSheet,
    View,ScrollView
} from 'react-native';

import * as productActioncs from '../store/actions/products';
import {useDispatch} from 'react-redux';
import * as userActions from '../store/actions/user';
import HomeHeader from '../components/Home/HomeHeader';


const Home = ({navigation}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActioncs.fetchFavs());
        dispatch(userActions._getUserAddresses());
    }, [dispatch]);
    return(
        <ScrollView style={styles.container}>
            {/*<ProductOverviewScreen {...props}/>*/}
            <View style={styles.headerContainer}>
                <HomeHeader
                navigation={() => navigation.jumpTo('Search')}
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

    }
});
