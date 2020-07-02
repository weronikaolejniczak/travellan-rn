import React, { useState, useEffect, useReducer, useCallback} from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert} from 'react-native';

import { useDispatch} from 'react-redux';

import Input from '../../Components/UI/Input';
import Card from '../../Components/UI/Card';
import Colors from '../../Constants/Colors';
import * as authActions from '../../Stores/Actions/Auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type == FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
}


const AuthScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occured!', error, [{ text: 'Okay'}]);
        }
    }, [error]);
    
    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.login(
                formState.inputValues.email, 
                formState.inputValues.password
                
            );

        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);

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
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView 
        behavior ="padding"
        keyboardVerticalOffset={50}
        style={styles.screen}
        >
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input //style={styles.input}
                        id='email'
                        label='E-Mail'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize="none"
                        errorText="Please enter a valid email address."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                        />
                        <Input //styles = {styles.input}
                        id='password'
                        label='Password'
                        keyboardType='default'
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a valid password(at least 5 letters)"
                        onInputChange={inputChangeHandler}
                        initialValue=""  
                        />
                        <View style = {styles.buttonContainer}>
                            {isLoading ? <ActivityIndicator size='small' color={Colors.white} /> :
                            <Button
                                title={isSignup ? 'Sign Up' : 'Login' }
                                color={Colors.primary} 
                                onPress={authHandler} 
                            />}
                            </View>
                        <View style = {styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                color={Colors.accent}
                                onPress={() => {
                                    setIsSignup(prevState => !prevState);
                                    props.navigation.navigate("My trips");
                                }}
                            />
                        </View>

                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
    )
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222222'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        backgroundColor: Colors.primary,
        //text: Colors.white
    },
    buttonContainer: {
        marginTop: 10
    },
    input: {
        color: '#FFFFFF'
    }


});

/** 
export const authScreenOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          style={{marginRight: 3}}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Create a trip');
          }}
        />
      </HeaderButtons>
    ),
  };
};
*/
export default AuthScreen;

