import React, {useState, useCallback, useEffect} from 'react';
import { View, ScrollView, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import {fetchWeather} from 'weather/services/Weather';
import {weatherStyle as styles} from './WeatherStyle';
import Colors from 'constants/Colors';
import {WEATHER_ID} from 'react-native-dotenv';

const client_id = WEATHER_ID;

/** Weather container */
const Weather = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const region = selectedTrip.region;
  const latitude = region.latitude;
  const longitude = region.longitude;

  const [info,setInfo]= useState({
    //FIRST DAY
    date_1: "loading",
    maxTemp_1: "loading", // Celsius
    minTemp_1: "loading", // Celsius
    tempDay_1: "loading", // Celsius
    tempNight_1: "loading", // Celsius
    tempFeels_like_day_1: "loading", //Celsius
    tempFeels_like_night_1: "loading", //Celsius
    pressure_1: "loading", // hPa
    humidity_1: "loading", // %
    wind_speed_1: "loading", // m/s
    cloudiness_1: "loading", //  %
    description_1: 'loading', // string
    rain_1: 'loading', // propability
    icon_1: 'loading', // icon id
    //SECOND DAY
    date_2: "loading",
    maxTemp_2: "loading", // Celsius
    minTemp_2: "loading", // Celsius
    tempDay_2: "loading", // Celsius
    tempNight_2: "loading", // Celsius
    tempFeels_like_day_2: "loading", //Celsius
    tempFeels_like_night_2: "loading", //Celsius
    pressure_2: "loading", // hPa
    humidity_2: "loading", // %
    wind_speed_2: "loading", // m/s
    cloudiness_2: "loading", //  %
    description_2: 'loading', // string
    rain_2: 'loading', // propability
    icon_2: 'loading', // icon id
    //THIRD DAY
    date_3: "loading",
    maxTemp_3: "loading", // Celsius
    minTemp_3: "loading", // Celsius
    tempDay_3: "loading", // Celsius
    tempNight_3: "loading", // Celsius
    tempFeels_like_day_3: "loading", //Celsius
    tempFeels_like_night_3: "loading", //Celsius
    pressure_3: "loading", // hPa
    humidity_3: "loading", // %
    wind_speed_3: "loading", // m/s
    cloudiness_3: "loading", //  %
    description_3: 'loading', // string
    rain_3: 'loading', // propability
    icon_3: 'loading', // icon id
    //FOURTH DAY
    date_4: "loading",
    maxTemp_4: "loading", // Celsius
    minTemp_4: "loading", // Celsius
    tempDay_4: "loading", // Celsius
    tempNight_4: "loading", // Celsius
    tempFeels_like_day_4: "loading", //Celsius
    tempFeels_like_night_4: "loading", //Celsius
    pressure_4: "loading", // hPa
    humidity_4: "loading", // %
    wind_speed_4: "loading", // m/s
    cloudiness_4: "loading", //  %
    description_4: 'loading', // string
    rain_4: 'loading', // propability
    icon_4: 'loading', // icon id
    //FIFTH DAY
    date_5: "loading",
    maxTemp_5: "loading", // Celsius
    minTemp_5: "loading", // Celsius
    tempDay_5: "loading", // Celsius
    tempNight_5: "loading", // Celsius
    tempFeels_like_day_5: "loading", //Celsius
    tempFeels_like_night_5: "loading", //Celsius
    pressure_5: "loading", // hPa
    humidity_5: "loading", // %
    wind_speed_5: "loading", // m/s
    cloudiness_5: "loading", //  %
    description_5: 'loading', // string
    rain_5: 'loading', // propability
    icon_5: 'loading', // icon id

  })

  useEffect(()=>{
    getWeather();

  },[])
  
  const getWeather = ()=>{
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,current,minutely}&APPID=${client_id}&units=metric`)
    .then(data=>data.json())
    .then(results=>{ 
      setInfo({
        //FIRST DAY
        date_1: results.daily[0].dt,
        maxTemp_1: results.daily[0].temp.max,
        minTemp_1: results.daily[0].temp.min,
        tempDay_1: results.daily[0].temp.day,
        tempNight_1: results.daily[0].temp.night,
        tempFeels_like_day_1: results.daily[0].feels_like.day,
        tempFeels_like_night_1: results.daily[0].feels_like.night,
        pressure_1: results.daily[0].pressure,
        humidity_1: results.daily[0].humidity,
        wind_speed_1: results.daily[0].wind_speed,
        cloudiness_1: results.daily[0].clouds,
        description_1: results.daily[0].weather[0].description,
        rain_1: results.daily[0].pop,
        icon_1: results.daily[0].weather[0].icon,
        //SECOND DAY
        date_2: results.daily[1].dt,
        maxTemp_2: results.daily[1].temp.max,
        minTemp_2: results.daily[1].temp.min,
        tempDay_2: results.daily[1].temp.day,
        tempNight_2: results.daily[1].temp.night,
        tempFeels_like_day_2: results.daily[1].feels_like.day,
        tempFeels_like_night_2: results.daily[1].feels_like.night,
        pressure_2: results.daily[1].pressure,
        humidity_2: results.daily[1].humidity,
        wind_speed_2: results.daily[1].wind_speed,
        cloudiness_2: results.daily[1].clouds,
        description_2: results.daily[1].weather[0].description,
        rain_2: results.daily[1].pop,
        icon_2: results.daily[1].weather[0].icon,
        //THIRD DAY
        date_3: results.daily[2].dt,
        maxTemp_3: results.daily[2].temp.max,
        minTemp_3: results.daily[2].temp.min,
        tempDay_3: results.daily[2].temp.day,
        tempNight_3: results.daily[2].temp.night,
        tempFeels_like_day_3: results.daily[2].feels_like.day,
        tempFeels_like_night_3: results.daily[2].feels_like.night,
        pressure_3: results.daily[2].pressure,
        humidity_3: results.daily[2].humidity,
        wind_speed_3: results.daily[2].wind_speed,
        cloudiness_3: results.daily[2].clouds,
        description_3: results.daily[2].weather[0].description,
        rain_3: results.daily[2].pop,
        icon_3: results.daily[2].weather[0].icon,
        //FOURTH DAY
        date_4: results.daily[3].dt,
        maxTemp_4: results.daily[3].temp.max,
        minTemp_4: results.daily[3].temp.min,
        tempDay_4: results.daily[3].temp.day,
        tempNight_4: results.daily[3].temp.night,
        tempFeels_like_day_4: results.daily[3].feels_like.day,
        tempFeels_like_night_4: results.daily[3].feels_like.night,
        pressure_4: results.daily[3].pressure,
        humidity_4: results.daily[3].humidity,
        wind_speed_4: results.daily[3].wind_speed,
        cloudiness_4: results.daily[3].clouds,
        description_4: results.daily[3].weather[0].description,
        rain_4: results.daily[3].pop,
        icon_4: results.daily[3].weather[0].icon,
        //FIFTH DAY
        date_5: results.daily[4].dt,
        maxTemp_5: results.daily[4].temp.max,
        minTemp_5: results.daily[4].temp.min,
        tempDay_5: results.daily[4].temp.day,
        tempNight_5: results.daily[4].temp.night,
        tempFeels_like_day_5: results.daily[4].feels_like.day,
        tempFeels_like_night_5: results.daily[4].feels_like.night,
        pressure_5: results.daily[4].pressure,
        humidity_5: results.daily[4].humidity,
        wind_speed_5: results.daily[4].wind_speed,
        cloudiness_5: results.daily[4].clouds,
        description_5: results.daily[4].weather[0].description,
        rain_5: results.daily[4].pop,
        icon_5: results.daily[4].weather[0].icon,
      })
    })
  }


  return (
    <ScrollView >
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_1+".png"}}
      />
      {/*FIRST DAY*/}
      <Text>Date: {info.date_1}</Text>
      <Text>Max Temperature: {info.maxTemp_1}°C</Text>
      <Text>Min Temperature: {info.minTemp_1}°C</Text>
      <Text>Day Temperature: {info.tempDay_1}°C</Text>
      <Text>Night Temperature: {info.tempNight_1}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_1}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_1}°C</Text>
      <Text>Pressure: {info.pressure_1}hPa</Text>
      <Text>Humidity: {info.humidity_1}%</Text>
      <Text>Wind Speed: {info.wind_speed_1}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_1}%</Text>
      <Text>Description: {info.description_1}</Text>
      <Text>Propability of rain: {info.rain_1 * 100}%</Text>
      {/*<Text>Icon id: {info.icon_1}</Text>*/}
      {/*SECOND DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_2+".png"}}
      />
      <Text>Date: {info.date_2}</Text>
      <Text>Max Temperature: {info.maxTemp_2}°C</Text>
      <Text>Min Temperature: {info.minTemp_2}°C</Text>
      <Text>Day Temperature: {info.tempDay_2}°C</Text>
      <Text>Night Temperature: {info.tempNight_2}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_2}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_2}°C</Text>
      <Text>Pressure: {info.pressure_2}hPa</Text>
      <Text>Humidity: {info.humidity_2}%</Text>
      <Text>Wind Speed: {info.wind_speed_2}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_2}%</Text>
      <Text>Description: {info.description_2}</Text>
      <Text>Propability of rain: {info.rain_2 * 100}%</Text>
      {/*<Text>Icon id: {info.icon_1}</Text>*/}
      {/*THIRD DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_3+".png"}}
      />
      <Text>Date: {info.date_3}</Text>
      <Text>Max Temperature: {info.maxTemp_3}°C</Text>
      <Text>Min Temperature: {info.minTemp_3}°C</Text>
      <Text>Day Temperature: {info.tempDay_3}°C</Text>
      <Text>Night Temperature: {info.tempNight_3}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_3}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_3}°C</Text>
      <Text>Pressure: {info.pressure_3}hPa</Text>
      <Text>Humidity: {info.humidity_3}%</Text>
      <Text>Wind Speed: {info.wind_speed_3}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_3}%</Text>
      <Text>Description: {info.description_3}</Text>
      <Text>Propability of rain: {info.rain_3 * 100}%</Text>
      {/*<Text>Icon id: {info.icon_3}</Text>*/}
      {/*FOURTH DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_4+".png"}}
      />
      <Text>Date: {info.date_4}</Text>
      <Text>Max Temperature: {info.maxTemp_4}°C</Text>
      <Text>Min Temperature: {info.minTemp_4}°C</Text>
      <Text>Day Temperature: {info.tempDay_4}°C</Text>
      <Text>Night Temperature: {info.tempNight_4}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_4}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_4}°C</Text>
      <Text>Pressure: {info.pressure_4}hPa</Text>
      <Text>Humidity: {info.humidity_4}%</Text>
      <Text>Wind Speed: {info.wind_speed_4}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_4}%</Text>
      <Text>Description: {info.description_4}</Text>
      <Text>Propability of rain: {info.rain_4 * 100}%</Text>
      {/*<Text>Icon id: {info.icon_4}</Text>*/}
      {/*FIFTH DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_5+".png"}}
      />
      <Text>Date: {info.date_5}</Text>
      <Text>Max Temperature: {info.maxTemp_5}°C</Text>
      <Text>Min Temperature: {info.minTemp_5}°C</Text>
      <Text>Day Temperature: {info.tempDay_5}°C</Text>
      <Text>Night Temperature: {info.tempNight_5}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_5}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_5}°C</Text>
      <Text>Pressure: {info.pressure_5}hPa</Text>
      <Text>Humidity: {info.humidity_5}%</Text>
      <Text>Wind Speed: {info.wind_speed_5}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_5}%</Text>
      <Text>Description: {info.description_5}</Text>
      <Text>Propability of rain: {info.rain_5 * 100}%</Text>
      {/*<Text>Icon id: {info.icon_5}</Text>*/}
    </ScrollView>
  );
};

export default Weather;
