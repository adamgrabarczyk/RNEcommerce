import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import * as productActioncs from '../store/actions/products';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../store/actions/user';
import HomeHeader from '../components/Home/HomeHeader';
import BestDeals from '../components/Home/BestDeals';
import Suggestions from '../components/Home/Suggestions';
import Cutscene from '../components/Home/Cutscene';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constans/Colors';
import {
  categoryFilters,
  markFilters,
} from '../components/shop/FilterControls';
import MarksSuggestions from '../components/Home/MarksSuggestions';
import * as notificationActions from '../store/actions/notifications';
import * as permissionActions from '../store/actions/permissions';
import * as orderActioncs from '../store/actions/orders';
import Spinner from '../components/UI/Spinner';

const Home = ({ navigation }, props) => {
  const dispatch = useDispatch();

  const ref = React.useRef(null);

  useScrollToTop(ref);

  const products = useSelector((state) => state.products.availableProducts);
  const bestDealsData = products.filter(
    (product) => parseInt(product.price) < 2500,
  );

  const subcategories = categoryFilters
    .map((category) => category.subcategory)
    .flat();

  const refrigeratorsData = products.filter(
    (product) => product.subcategory[0].subcategory_id === '3',
  );

  const [randomCategoryLabel, setRandomCategoryLabel] = useState([]);
  const [randomSubcategoryLabel, setRandomSubcategoryLabel] = useState([]);

  let iconName;

  useEffect(() => {
    dispatch(productActioncs.fetchProducts()).then(() =>
      dispatch(productActioncs.fetchFavs()),
    );
    dispatch(userActions._getUserAddresses());
    dispatch(notificationActions._getUserNotifications());
    dispatch(permissionActions._getUserPermissions());
    dispatch(orderActioncs.fetchOrders());

    const getRandom = (arr, n) => {
      let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len) {
        throw new RangeError('getRandom: more elements taken than available');
      }
      while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
      }
      console.log(result);
      if (arr === categoryFilters) {
        setRandomCategoryLabel(result);
      } else if (arr === subcategories) {
        setRandomSubcategoryLabel(result);
      }
      return result;
    };

    getRandom(categoryFilters, 4);
    getRandom(subcategories, 4);
  }, [dispatch]);

  if (products.length < 1 || refrigeratorsData.length < 1) {
    return <Spinner spinnerSize={'fullScreen'} />;
  }

  return (
    <ScrollView ref={ref} style={styles.container}>
      <View style={styles.headerContainer}>
        <HomeHeader
          navigation={() => navigation.jumpTo('Search')}
          navigateCategory={() => navigation.navigate('ChooseCategory')}
        />
      </View>
      <View style={styles.bestDeals}>
        <BestDeals
          headerTitle={'Sprawdź najlepsze oferty'}
          suggestions={bestDealsData.map((product) => (
            <Suggestions
              key={product.id.toString()}
              imageUri={{ uri: product.image }}
              imageName={product.name}
              price={product.price}
              details={() =>
                navigation.navigate('ProductDetails', {
                  productId: product.id,
                  productTitle: product.name,
                })
              }
            />
          ))}
        />
      </View>
      <View style={styles.cutceneContainer}>
        {randomCategoryLabel.map((category) => {
          if (category.name === 'category_electronic') {
            iconName = 'logo-electron';
          } else if (category.name === 'category_sport') {
            iconName = 'md-basketball-outline';
          } else if (category.name === 'category_car_parts') {
            iconName = 'md-car-sharp';
          } else if (category.name === 'category_decoration') {
            iconName = 'ios-ribbon';
          } else if (category.name === 'category_clothes') {
            iconName = 'md-shirt-outline';
          } else if (category.name === 'category_garden') {
            iconName = 'ios-rose-sharp';
          } else if (category.name === 'category_toys') {
            iconName = 'logo-ionitron';
          }

          return (
            <Cutscene
              key={category.name}
              icon={
                <Ionicons name={iconName} size={40} color={Colors.accent} />
              }
              iconWrapperText={category.label}
              action={() =>
                navigation.navigate('Category', {
                  categoryName: category.label,
                })
              }
            />
          );
        })}
      </View>
      <View style={styles.bestDeals}>
        <BestDeals
          headerTitle={'Lodówki najlepszej jakości'}
          suggestions={refrigeratorsData.map((product) => (
            <Suggestions
              key={product.id.toString()}
              imageUri={{ uri: product.image }}
              imageName={product.name}
              price={product.price}
              details={() =>
                navigation.navigate('ProductDetails', {
                  productId: product.id,
                  productTitle: product.name,
                })
              }
            />
          ))}
        />
      </View>
      <View style={styles.cutceneContainer}>
        {randomSubcategoryLabel.map((subcategory) => {
          iconName = 'gift-outline';
          return (
            <Cutscene
              key={subcategory.name}
              icon={
                <Ionicons name={iconName} size={40} color={Colors.accent} />
              }
              iconWrapperText={subcategory.label}
              action={() =>
                navigation.navigate('Subcategory', {
                  subcategoryName: subcategory.label,
                })
              }
            />
          );
        })}
      </View>
      <View style={styles.favouriteMarks}>
        <BestDeals
          container={styles.markContainer}
          headerTitle={'Ulubione marki'}
          suggestions={markFilters.map((product) => (
            <MarksSuggestions
              key={product.name}
              logo={
                <Image
                  source={{ uri: product.logo }}
                  style={{ width: 90, height: 90 }}
                />
              }
              details={() =>
                navigation.navigate('Mark', {
                  markTitle: product.label,
                })
              }
            />
          ))}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {},

  bestDeals: {
    backgroundColor: '#dedede',
    marginTop: 20,
    marginBottom: 20,
  },

  cutceneContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  favouriteMarks: {
    marginTop: 20,
    marginBottom: 20,
  },

  markContainer: {
    backgroundColor: '#ededed',
  },
});
