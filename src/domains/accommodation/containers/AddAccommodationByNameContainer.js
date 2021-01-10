import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  ScrollView as Container,
  Headline,
  TextInput,
  ItemlessFrame,
} from 'utils';
import { View } from 'react-native';
import fetchHotelByName from 'services/fetchHotelByName';

const AddAccommodationByNameContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, SetIsDateSame] = useState(true);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState();
  const { startDate, endDate, cityCode } = props.route.params;

  const formatDate = (date) => {
    //format to YYYY-MM-DD
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const handleChange = (val) => {
    setValue(val);
  };

  const fetchHotel = useCallback(async () => {
    try {
      const result = await fetchHotelByName(cityCode, value);
      setData(result[0]);
    } catch {
      setError(error);
      throw error;
    }
  }, [cityCode, value]);

  const handlePress = () => {
    handleChange();
    setIsLoading(true);
    fetchHotel(cityCode, value);
  };

  useEffect(() => {
    if (formatDate(startDate) == formatDate(endDate)) {
      SetIsDateSame(true);
    } else {
      SetIsDateSame(false);
    }
  }, [startDate, endDate]);

  if (cityCode == undefined)
    return (
      <ItemlessFrame message="Sorry, searching for hotels by name near your destination is impossible!" />
    );

  if (isDateSame)
    return (
      <ItemlessFrame
        message="Searching for a hotel by name is not possible if you are going on a
    one day trip!"
      />
    );

  return (
    <Container>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Headline>Add your accomodation by typing name of your hotel</Headline>
      </View>
      <TextInput
        label="Hotel name"
        error={error}
        onChange={handleChange}
        value={value}
      />
      <Button loading={isLoading} disabled={isLoading} onPress={handlePress}>
        Submit
      </Button>
    </Container>
  );
};

export default AddAccommodationByNameContainer;
