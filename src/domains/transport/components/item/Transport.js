import React, {useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from 'components/card/Card';
import TransportStage from 'transport/components/stage/Transport';
import * as transportActions from 'transport/state/Actions';
import {transportItemStyle as styles, cardHeight} from './TransportStyle';

/** QR-related imports */
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

/** Transport item component used in Transport container for tickets listing */
const Transport = (props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation(); // navigation hook
  const [showQR, setshowQR] = useState(false);
  const tripId = props.tripId;
  const ticketId = props.id;
  const transportTransfers = props.stages.length - 1;
  var qr = props.qr;

  const deleteTicketHandler = useCallback(() => {
    dispatch(transportActions.deleteTransport(tripId, ticketId));
  }, [dispatch, tripId, ticketId]);

  const closeQRhandler = () => {
    setshowQR(false);
  };

  const deleteQR = async () => {
    qr = '';
    await dispatch(transportActions.updateTransport(tripId, ticketId, qr));
    setshowQR(false);
  };
  const movetoQR = () => {
    navigation.navigate('Add QR', {
      tripId: tripId,
      ticketId: ticketId,
      transportTransfers: transportTransfers,
      qr: qr,
    });
  };

  return (
    <Card style={styles.transportCard}>
      <View style={styles.actions}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showQR}
          onRequestClose={() => {
            Alert.alert('Closing QR');
          }}>
          <View style={styles.container}>
            <QRCode
              style={styles.qrstyle}
              value={qr}
              size={300}
              logoSize={300}
            />
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={closeQRhandler}>
              <MaterialIcon name={'close'} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => {
                Alert.alert(
                  'Delete QR',
                  'Are you sure?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: deleteQR,
                    },
                  ],
                  {cancelable: true},
                );
              }}>
              <MaterialIcon name={'delete'} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </Modal>
        {/* DELETE TICKET */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Delete a ticket',
              'Are you sure?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: deleteTicketHandler,
                },
              ],
              {cancelable: true},
            );
          }}>
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* SHOW/ADD QR CODE */}
        <TouchableOpacity
          onPress={() => {
            if (qr === '') {
              Alert.alert(
                'Add QR code',
                'Are you sure?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: movetoQR,
                  },
                ],
                {cancelable: true},
              );
            } else {
              setshowQR(true);
            }
          }}>
          <MaterialIcon name={'qrcode-scan'} style={styles.icon} />
        </TouchableOpacity>
        {/* ATTACH TICKET */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Attach document');
          }}>
          <MaterialIcon name={'file-pdf-box'} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {/* TO/FROM DESTINATION */}
      <ScrollView
        style={[{marginTop: cardHeight * 0.0465}]}
        indicatorStyle={'white'}>
        <View style={[styles.rowCenter, {paddingVertical: 15}]}>
          {props.to === true ? (
            <Text style={[styles.header]}>to {props.destination}</Text>
          ) : (
            <Text style={[styles.header]}>from {props.destination}</Text>
          )}
          <Text style={[styles.text]}>
            {transportTransfers === 1
              ? `${transportTransfers} transport transfer`
              : `${transportTransfers} transport transfers`}
          </Text>
        </View>

        {/* RENDER TRANSPORT STAGE COMPONENT FOR EACH STAGE */}
        <View style={{flex: 1, alignItems: 'center', marginBottom: '5%'}}>
          {props.stages.map((i) => {
            return <TransportStage stage={i} index={props.stages.indexOf(i)} />;
          })}
        </View>
      </ScrollView>
    </Card>
  );
};

export default Transport;
