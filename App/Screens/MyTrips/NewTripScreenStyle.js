import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

/**
 * TODO:
 * refactor Fonts
 * refactor Metrics
 */
export const newTripScreenStyle = StyleSheet.create({
  form: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  metrics: {
    paddingVertical: 10,
  },
  label: {
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '5%',
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    color: Colors.text,
    fontSize: 20,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginVertical: 2,
    marginHorizontal: 2,
    marginLeft: '10%',
    marginRight: '10%',
  },
  errorContainer: {
    marginVertical: 5,
    marginHorizontal: 40,
  },
  error: {
    color: Colors.error,
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 20,
  },
  button: {
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    width: '40%',
    padding: 15,
    margin: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
});