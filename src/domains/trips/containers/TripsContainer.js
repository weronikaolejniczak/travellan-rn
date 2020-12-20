import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, Alert, TouchableHighlight, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';

import {ItemlessFrame, LoadingFrame} from 'components/frames';
import {TripItem} from '../components';
import HeaderButton from 'components/headerButton/HeaderButton';
import * as tripsActions from 'actions/tripsActions';
import {styles} from './TripsContainerStyle';
import Colors from '../../../utils/Card/node_modules/constants/Colors';

const TripsContainer = (props) => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.trips);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTrips = useCallback(() => {
    try {
      dispatch(tripsActions.fetchTripsRequest());
    } catch {
      setError('Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  const deleteTrip = useCallback((id) => {
    setIsLoading(true);
    try {
      dispatch(tripsActions.deleteTripRequest(id));
    } catch {
      setError('Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  const handleDeleteTrip = (item) => {
    Alert.alert(
      `Delete a trip to ${item.destination}`,
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteTrip(item.id),
        },
      ],
      {cancelable: true},
    );
  };

  const handleSelectItem = (id, destination) => {
    props.navigation.navigate('Details', {
      tripId: id,
      tripDestination: destination,
    });
  };

  useEffect(() => {
    loadTrips();
    SplashScreen.hide();
  }, [loadTrips]);

  if (isLoading) {
    return <LoadingFrame />;
  }

  if (error) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  if (Array.isArray(trips) && trips.length < 1) {
    return <ItemlessFrame message="You have no trips saved!" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={(data) => (
          <TripItem
            image={data.item.image}
            destination={data.item.destination}
            startDate={data.item.startDate.split(' ').slice(1, 4).join(' ')}
            endDate={data.item.endDate.split(' ').slice(1, 4).join(' ')}
            onSelect={() => {
              handleSelectItem(data.item.id, data.item.destination);
            }}>
            <TouchableHighlight
              style={styles.deleteButton}
              onPress={() => handleDeleteTrip(data.item)}>
              <Icon name="delete" style={styles.deleteIcon} />
            </TouchableHighlight>
          </TripItem>
        )}
      />
    </View>
  );
};

export const tripsOptions = (navData) => {
  return {
    headerLeft: null,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add trip"
          iconName="plus"
          onPress={() => navData.navigation.navigate('Add trip')}
        />
      </HeaderButtons>
    ),
  };
};

export default TripsContainer;
