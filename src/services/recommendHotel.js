import axios from 'axios';
import { BACKEND_URL } from 'react-native-dotenv';

async function recommendHotel(
  cityCode,
  checkInDate,
  checkOutDate,
  adults,
  roomQuantity,
) {
  return await axios
    .get(
      `${BACKEND_URL}/accommodation/recommendation?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&radius=100&adults=${adults}&roomQuantity=${roomQuantity}`,
    )
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default recommendHotel;