import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Input from 'user/components/input/Input';
import Colors from 'constants/Colors';
import * as authActions from 'state/user/userActions';
import {RegisterStyle as styles} from './RegisterStyle';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const Register = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    inputValidities: {
      email: false,
      password: false,
      confirmPassword: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{text: 'Okay'}]);
    }
  }, [error]);
  
  const handleSubmit = () => {
    if (formState.inputValues.password != formState.inputValues.confirmPassword) {
      alert("Passwords don't match")
    }
    else  {
      authHandler();
    }
  }
  const authHandler = async () => {
    let action;
    action = authActions.signup(
      formState.inputValues.email,
      formState.inputValues.password,
    );
    setError(null);
    setIsLoading(true);
    
    try {
      await dispatch(action);
      props.navigation.navigate('Auth');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.screen}>
      <View style={styles.authContainer}>
        <ScrollView>
          <View style={{marginBottom: 150}}></View>
          <Input
            style={[styles.input]}
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            styles={styles.input}
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password (at least 5 characters)"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            styles={styles.input}
            id="confirmPassword"
            label="Confirm Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="The passwords must match"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.actionsContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <TouchableOpacity
                style={[styles.buttonContainer, {marginRight: 10}]}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Join Travellan</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Auth');
              }}>
              <Text style={styles.buttonText}>Or sign in instead</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export const authOptions = {
  headerShown: false,
};

export default Register;
