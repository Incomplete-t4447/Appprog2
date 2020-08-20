import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { API_KEY } from './WeatherAPIKey';
import {Weather} from './Weather';

function App(){
const[isLoading, setIsLoading] = React.useState(true); 
const [data, setData] = React.useState({temperture: 0, weatherCondition: null});

   const fetchWeather = (lat = 25, lon = 25) => {
     
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
         
        setData({temperture: json.main.temp, weatherCondition: json.weather[0].main})
        setIsLoading(false);

      });
  }

  React.useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      position => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      });
},  [])


    return (
      
      <View style={styles.container}>
         {isLoading ? <Text>Fetching The Weather - or api call is blocked</Text> : <Weather weather={data.weatherCondition} temperature={data.temperture} ></Weather>}

      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default App; 
