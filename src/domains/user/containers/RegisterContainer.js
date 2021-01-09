import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';
import Colors from 'constants/Colors';
import { Button, TextInput } from 'utils';
import { Formik } from 'formik';
import { signUpRequest } from 'actions/userActions';
import { styles } from './RegisterContainerStyle';

const RegisterContainer = (props, ...rest) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <Formik
      initialValues={{
        confirmPassword: '',
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        setError(null);
        setIsLoading(true);
        let action;
        action = signUpRequest(values.email, values.password);
        try {
          await dispatch(action);
          setIsLoading(false);
          props.navigation.navigate('Auth');
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }}
      validationSchema={yup.object().shape({
        confirmPassword: yup
          .string()
          .required('Cannot be left empty')
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
        email: yup
          .string()
          .email('Invalid email address')
          .required('Cannot be left empty'),
        password: yup
          .string()
          .min(6, 'Password must be at least 6 characters long')
          .max(20, 'Password cannot exceed 20 characters')
          .required('Cannot be left empty')
          .matches(
            /[a-zA-Z0-9_]/,
            'Password can only contain Latin letters and numbers.',
          ),
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.screen}
        >
          <View style={styles.authContainer}>
            <ScrollView>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={require('assets/images/logo.png')}
                />
              </View>
              <View style={styles.formControl}>
                <TextInput
                  {...rest}
                  value={values.email}
                  autoCapitalize="none"
                  onChange={handleChange('email')}
                  label="E-mail"
                  error={errors.email}
                />
                {touched.email && errors.email && (
                  <View style={styles.errorContainer}>
                    <Text style={{ color: Colors.error }}>{errors.email}</Text>
                  </View>
                )}
              </View>
              <View style={styles.formControl}>
                <TextInput
                  {...rest}
                  value={values.password}
                  autoCapitalize="none"
                  onChange={handleChange('password')}
                  secureTextEntry={true}
                  label="Password"
                  error={errors.password}
                />
                {touched.password && errors.password && (
                  <View style={styles.errorContainer}>
                    <Text style={{ color: Colors.error }}>
                      {errors.password}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.formControl}>
                <TextInput
                  {...rest}
                  value={values.confirmPassword}
                  autoCapitalize="none"
                  onChange={handleChange('confirmPassword')}
                  secureTextEntry={true}
                  label="Confirm Password"
                  error={errors.confirmPassword}
                />
              </View>
              <View style={styles.actionsContainer}>
                <Button
                  {...rest}
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={handleSubmit}
                  mode="outlined"
                >
                  Sign up
                </Button>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Auth');
                  }}
                >
                  <Text style={styles.buttonText}>Or sign in instead</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default RegisterContainer;
