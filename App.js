/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Geolocation} from 'react-native';
import getDirections from 'react-native-google-maps-directions';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentLat: '',
      currentLong: ''
    }
  }

  handleGetDirections = () => {
    const data = {
       source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode 
        }
      ]
    }
 
    getDirections(data)

    navigator.geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
          this.setState({currentLat: parseFloat(position.coords.longitude) }) ;
          //getting the Longitude from the location json
          this.setState({currentLong: parseFloat(position.coords.latitude)});
          //getting the Latitude from the location json
      },
      (error) => alert(error.message),
      { 
         enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
      }

   );


  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
        <Text>{this.state.currentLat}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
