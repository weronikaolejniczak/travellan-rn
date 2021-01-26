import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
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
import { Button, TextInput } from 'utils';
import { Formik } from 'formik';
import { SocialButton } from '../components';
import {
  loginRequest,
  onFacebookButtonPress,
  onGoogleButtonPress,
} from 'actions/userActions';
import { styles } from './AuthenticationContainerStyle';

const AuthenticationContainer = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleGoogle = async () => {
    setError(null);
    setIsLoading(true);
    const action = onGoogleButtonPress();
    try {
      setError(null);
      await dispatch(action);
      navigation.navigate('My trips');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  const handleFacebook = async () => {
    setError(null);
    setIsLoading(true);
    const action = onFacebookButtonPress();
    try {
      setError(null);
      await dispatch(action);
      navigation.navigate('My trips');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    SplashScreen.hide();
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        setError(null);
        setIsLoading(true);
        const action = loginRequest(values.email, values.password);
        try {
          await dispatch(action);
          setIsLoading(false);
          navigation.navigate('My trips');
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email('Invalid email address')
          .required('Cannot be left empty'),
        password: yup
          .string()
          .min(6)
          .max(20)
          .required('Cannot be left empty')
          .matches(
            /[a-zA-Z0-9_]/,
            'Password only contains Latin letters and numbers.',
          ),
      })}
    >
      {({ values, handleChange, errors, isValid, handleSubmit, touched }) => (
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
                  value={values.email}
                  style={styles.input}
                  onChange={handleChange('email')}
                  autoCapitalize="none"
                  label="E-mail"
                  error={errors.email && touched.email ? errors.email : null}
                />
              </View>
              <View style={styles.formControl}>
                <TextInput
                  value={values.password}
                  autoCapitalize="none"
                  onChange={handleChange('password')}
                  secureTextEntry={true}
                  label="Password"
                  error={
                    errors.password && touched.password ? errors.password : null
                  }
                />
                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={handleSubmit}
                  style={styles.loginButton}
                >
                  Sign in
                </Button>
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                  <Text style={styles.navTextForgot}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.socialsContainer}>
                  <SocialButton
                    buttonTitle="Sign In with Facebook"
                    btnType="facebook"
                    color="#e6eaf4"
                    backgroundColor="#4267b2"
                    onPress={() => handleFacebook()}
                  />
                  <SocialButton
                    buttonTitle="Sign In with Google"
                    btnType="google"
                    color="#f5e7ea"
                    backgroundColor="#de4d41"
                    onPress={() => handleGoogle()}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                >
                  <View style={styles.padding}>
                    <Text style={styles.navTextRegister}>
                      Don't have an account? Create here
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export const authOptions = {
  headerShown: false,
};

export default AuthenticationContainer;
