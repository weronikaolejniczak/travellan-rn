import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
// imports from within the module
import Colors from '../../Constants/Colors';

const TripItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: props.image}} />
          </View>
          <View style={styles.alignRow}>
            <View style={styles.details}>
              <Text style={[styles.text, styles.destination]}>
                {props.destination}
              </Text>
              <Text style={[styles.text, styles.date]}>
                {props.startDate} - {props.endDate}
              </Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="Delete Trip"
                onPress={props.deleTrip} // no function link yet!
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

// REFACTOR to use constants
const styles = StyleSheet.create({
  product: {
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.background,
    height: 270,
    margin: 15,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden', // ensures that any child can't overlap what we set up
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  text: {
    color: '#FFFFFF',
  },
  destination: {
    fontSize: 22,
    marginVertical: 4,
  },
  date: {
    fontSize: 14,
  },
  actions: {
    margin: 30,
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default TripItem;
