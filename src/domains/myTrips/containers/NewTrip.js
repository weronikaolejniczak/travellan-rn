import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import Budget from 'budget/models/Budget';
import {createTrip} from 'myTrips/state/Actions';
import {newTripStyle as styles} from './NewTripStyle';
import Colors from 'constants/Colors';

/** 'CREATE A NEW TRIP' SCREEN - here a user can input basic information to create a new trip */
const NewTrip = (props) => {
  const dispatch = useDispatch();

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  // destination
  const [destination, setDestination] = useState('');
  const [destinationIsValid, setDestinationIsValid] = useState(false);
  const [destinationSubmitted, setDestinationSubmitted] = useState(false);

  // dates
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);

  // budget
  const [budget, setBudget] = useState();
  const [budgetIsValid, setBudgetIsValid] = useState(false);
  const [budgetIsEnabled, setBudgetIsEnabled] = useState(true);
  const [budgetSubmitted, setBudgetSubmitted] = useState(false);
  const [currency, setCurrency] = useState('PLN');

  /** HANDLERS */
  // destination validation handler
  let destinationRegex = new RegExp(
    "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$",
  );
  const destinationChangeHandler = (text) => {
    text.trim().length === 0 || !destinationRegex.test(text)
      ? setDestinationIsValid(false)
      : setDestinationIsValid(true);
    setDestination(text);
  };

  // date picker handlers
  // start date
  const startDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDate(Platform.OS === 'ios');
    setStartDate(currentDate);
    // set endDate to currentDate if it is earlier than the day
    // selected for startDate
    currentDate > endDate ? setEndDate(currentDate) : '';
  };

  const showStartDatepicker = () => {
    setShowStartDate(true);
  };

  // end date
  const endDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowEndDate(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showEndDatepicker = () => {
    setShowEndDate(true);
  };

  // budget handlers
  const clearBudget = () => {
    setBudget('0');
    setBudgetIsValid(true);
    setBudgetSubmitted(false);
  };

  const resetBudget = () => {
    setBudget();
    setBudgetIsValid(false);
  };

  // budget handlers
  const toggleBudgetSwitch = () => {
    setBudgetIsEnabled((previousState) => !previousState);
    !budgetIsEnabled ? resetBudget() : clearBudget();
  };

  // budget validation
  let budgetRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const budgetChangeHandler = (text) => {
    if (budgetIsEnabled) {
      !(!budgetRegex.test(text) || text.trim().length === 0)
        ? setBudgetIsValid(true)
        : setBudgetIsValid(false);
      setBudget(text);
    }
  };

  // submit handler
  const submitHandler = useCallback(() => {
    let budgetToSubmit = [
      new Budget(0, parseInt(budget, 10), currency, [
        {
          id: 0,
          title: 'Initial budget',
          value: parseInt(budget, 10),
          category: '',
          account: 'card',
          date: new Date(),
        },
      ]),
    ];

    if (!destinationIsValid || !budgetIsValid) {
      setDestinationSubmitted(true);
      if (budgetIsEnabled) {
        setBudgetSubmitted(true);
      }
    } else {
      dispatch(
        createTrip(
          destination,
          startDate.toString(),
          endDate.toString(),
          budgetToSubmit,
        ),
      );
      props.navigation.goBack();
    }
  }, [
    props.navigation,
    dispatch,
    destinationIsValid,
    budget,
    budgetIsValid,
    budgetIsEnabled,
    currency,
    destination,
    startDate,
    endDate,
  ]);

  /** this could be refactored into a component to minimize repetition */
  return (
    <ScrollView style={styles.container}>
      {/* DESTINATION */}
      <View style={styles.smallMarginTop}>
        <Text style={styles.label}>Trip destination</Text>
        <TextInput
          style={styles.input}
          placeholder="City and/or country"
          placeholderTextColor="grey"
          value={destination}
          onChangeText={destinationChangeHandler}
        />
        {!destinationIsValid && destinationSubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a valid city and/or country!</Text>
          </View>
        )}
      </View>

      {/* START DATE */}
      <View style={styles.bigMarginTop}>
        <Text style={styles.label}>Start date</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={showStartDatepicker} style={styles.picker}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Icon
                name={
                  Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'
                }
                style={styles.icon}
              />
              <Text style={styles.pickerText}>
                {startDate.toString().split(' ').slice(1, 4).join(' ')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {showStartDate && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={startDate}
            minimumDate={Date.now()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={startDateChangeHandler}
          />
        )}
      </View>

      {/* END DATE */}
      <View style={styles.bigMarginTop}>
        <Text style={styles.label}>End date</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={showEndDatepicker} style={styles.picker}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Icon
                name={
                  Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'
                }
                style={styles.icon}
              />
              <Text style={styles.pickerText}>
                {endDate.toString().split(' ').slice(1, 4).join(' ')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {showEndDate && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={endDate}
            minimumDate={startDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={endDateChangeHandler}
          />
        )}
      </View>

      {/* BUDGET */}
      <View style={styles.bigMarginTop}>
        <View style={[styles.rowAndCenter]}>
          <Text style={styles.label}>Budget</Text>
          {/* BUDGET SWITCH */}
          <Switch
            style={styles.switch}
            trackColor={{
              false: Colors.switchDisabledTrack,
              true: Colors.switchEnabledTrack,
            }}
            thumbColor={Colors.switchThumb}
            ios_backgroundColor={Colors.background}
            onValueChange={toggleBudgetSwitch}
            value={budgetIsEnabled}
          />
        </View>
        {budgetIsEnabled && (
          <View>
            {/* INITIAL AMOUNT */}
            <TextInput
              style={[styles.input]}
              placeholder={'Number'}
              placeholderTextColor="grey"
              value={budget}
              onChangeText={budgetChangeHandler}
              keyboardType={'numeric'}
            />
            {/* CURRENCY setCurrency */}
            <TextInput
              style={[styles.input]}
              placeholder={'Currency'}
              placeholderTextColor="grey"
              value={currency}
              onChangeText={(text) => setCurrency(text)}
            />
          </View>
        )}
        {/* ERROR */}
        {budgetIsEnabled && !budgetIsValid && budgetSubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a valid budget!</Text>
          </View>
        )}
      </View>
      {/* SUBMIT BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

/** we export newTripOptions to use in our Stack.Navigator */
export const newTripOptions = (navData) => {
  return {
    /* headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          style={{marginRight: 3}}
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitHandler(destination, startDate, endDate, budget)} // SUBMIT
        />
      </HeaderButtons>
    ), */
  };
};

export default NewTrip;