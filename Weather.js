import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from './WeatherConditions';
import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';


export let Weather = ({ weather, temperature }) => {
  
  const [Location, setlocation] = useState(["Beirut", "Granada", "London", "Skive", "Paris", "Viborg", "Rome"])
  const [fourCity, setFourCity] = useState([])
  const [Loading, setLoading] = useState(true)

 useEffect(() => {
  
  setlocation(Loading)

  
  for (let i = 0; i < Location.length; i++) {
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Location[i]}&units=metric&appid=b3a942e3abe91aef45c463ee43d469a4`)  
    .then(response => response.json())       
    .then(data => {
      
      var City = {
       name: Location[i],
       temp: data.main.temp,
       symbol: data.weather[0].main
      }
      console.log(data.weather)
      setFourCity(fourCity => [...fourCity,City] )
      setLoading(false)
      
    })  
 }
},[])
return (
  
  
  <View
    style={[
      styles.weatherContainer,
      { backgroundColor: weatherConditions[weather].color }
    ]}
  >
   
    <View style={styles.headerContainer}>
      
      <MaterialCommunityIcons
        size={72}
        name={weatherConditions[weather].icon}
        color={'#fff'}
      />
      <Text style={styles.subtitle}>Current Location</Text>
      <Text style={styles.tempText1}>{temperature}˚</Text>
      <Text style={styles.title}>{weatherConditions[weather].title}</Text>  
    </View>


    <View style={styles.bodyContainer}>
    <Text style={styles.Seperator}>____________</Text>

    {Loading ? <Text>"is Loading"</Text> : fourCity.map((x,index)=>{

       return( 
         
        <View style={styles.TextSetup}>

       <Text key={index} style={styles.NameText}>{x.name}</Text>
       <Text style={styles.TempText}>{x.temp }</Text>
       <Text style={styles.IconText}>{
        <MaterialCommunityIcons
        size={25}
        name={weatherConditions[x.symbol].icon}
        color={'#fff'}
        />}
       </Text>

       </View>

       )
       
      })}
      <Text style={styles.Seperator}>____________</Text>

    </View>
    
  </View> 
);
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
TextSetup:{
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection:'row',
  alignItems: 'flex-start',
  flexBasis: 'auto',
  marginTop: 5,
},

  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    
    //justifyContent: 'space-around'
    
  },
  tempText1: {
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    height: 400,
    paddingLeft: 25,
    marginTop: 2,
    //backgroundColor: 'red',
    justifyContent: 'space-between',
 
  },
  
  title: {
    fontSize: 60,
    color: '#fff',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',

  },
  imputcontainer:{ 
    height: 40, 
    borderColor: 'white', 
    borderWidth: 5

  },
  NameText: {
    fontSize: 24,
    color: '#fff',
    flexGrow:4

  },
  TempText: {
    fontSize: 24,
    color: '#fff',
    flexGrow:4
  },
  Seperator:{
    fontSize: 60,
    color: '#fff',
    marginTop : 1,
    
  },


});

/*    <View style={styles.bodyContainer}>
    <Text style={styles.Seperator}>____________</Text>

    {Loading ? <Text>"is Loading"</Text> : fourCity.map((x,index)=>{


        
       //return <Text key={index} style={styles.subtitle}>{x.name + " " + x.temp }
       return( 
         
        <View style={styles.TextSetup}>
        
       <Text key={index} style={styles.NameText}>{x.name}</Text>
       <Text style={styles.TempText}>{x.temp }</Text>
       <Text style={styles.IconText}>{
        <MaterialCommunityIcons
        size={25}
        name={weatherConditions[x.symbol].icon}
        color={'#fff'}
        />}
       </Text>
       </View>
       
       
       
       )
       
      })}
      <Text style={styles.Seperator}>____________</Text>
      


    </View>*/