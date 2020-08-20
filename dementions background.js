 import { StatusBar } from 'expo-status-bar';
 import React, { useState, useEffect } from "react";
 import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
 import logo from './assets/day.png';

 const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const App = () => {
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return (
    <View style={styles.container}>
     <Image source={logo} style={{ width: dimensions.screen.width, height: dimensions.screen.height }} /> 
     <Text>were does this go</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  

});

export default App;