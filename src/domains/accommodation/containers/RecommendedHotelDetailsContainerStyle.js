import { Dimensions, StyleSheet } from 'react-native';

import { Colors, Metrics } from 'constants';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.background,
  },
  details: {
    ...Metrics.bigPadding,
  },
  headerOverImage: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    height: height * 0.4,
    width: '100%',
  },
  linkButton: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    padding: 15,
    width: 220,
  },
  linkButtonText: {
    color: Colors.background,
    fontWeight: '600',
  },
  linkButtonWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  offerColumn: {
    marginRight: 25,
  },
  offerContent: {
    flexDirection: 'row',
  },
  rating: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 15,
    width: 50,
  },
  section: {
    ...Metrics.verticalMargin,
  },
});
