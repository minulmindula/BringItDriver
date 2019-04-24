

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView, PermissionsAndroid } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import getDirections from 'react-native-google-maps-directions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class OngoingDelivery extends Component {

  constructor(props){
    super(props);

    this.state = {
      isPickupComplete: false,
      currentRiderCordinateLat: 6.876817,
      currentRiderCordinateLong: 79.920405,
      currentLat: 0,
      currentLong: 0
    };
    
  }

  componentDidMount()
  {
    // this.setState({ restaurantDetails: apiRest });
    // this._getRestaurants();

    navigator.geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
          this.setState({currentLat: parseFloat(position.coords.latitude) }) ;
          //getting the Longitude from the location json
          this.setState({currentLong: parseFloat(position.coords.longitude)});
          //getting the Latitude from the location json
      },
      (error) => alert(error.message),
      { 
        enableHighAccuracy: false, timeout: 20000
      }
  
    );


  }

  _toggleDrawer = () => {
    //   alert('hi');
    this.props.navigation.openDrawer();
  }

  _completePickup = () => {
    this.setState({ isPickupComplete: true })
  }

  _pickupDetailMap = () => {

    if(this.state.currentLat == 0 && this.state.currentLong == 0)
    {
      alert('Please turn on location');
    }else {
      
      const data = {
        source: {
          latitude: this.state.currentLat,
          longitude: this.state.currentLong
        },
        destination: {
          latitude: 6.878497,
          longitude: 79.876550
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

    }




  

  }

  render() {

    return (
      <View style={styles.container}>

        <Header
          leftComponent={{icon:'menu', color:'#565656', onPress: () => this._toggleDrawer() }}
          // centerComponent={{text: 'Home'}}
          rightComponent={{icon: 'notifications', color: '#565656', onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
        />

        <View style={{ alignItems: 'center', marginTop: 15, marginBottom: 15 }}>

            <Text style={{ fontSize: RF(2.6) }}> Ongoing Delivery </Text>

        </View>

        {

          this.state.isPickupComplete

          ?

            <View>

              <Card 
                title="Drop off details"
                containerStyle={{ borderRadius: 5, backgroundColor: '#e9c8c8' }}
                dividerStyle={{ backgroundColor: 'grey' }}
              >

                <View>
                  <Text>Info</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                  <TouchableOpacity 
                    style={[ styles.detailBtns, { backgroundColor: '#4cd645', width: width / 2 } ]}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image 
                        source={require('../../assets/images/OrderDetails/complete.png')}
                        // style={{ margin: 5 }}
                      />
                      <Text style={{ marginLeft: 5 }}> Complete drop off </Text>
                    </View>
                  </TouchableOpacity>

                </View>

              </Card>

            </View>

          :

          <View>

            <Card 
              title="Pick up details"
              containerStyle={{ borderRadius: 5, backgroundColor: '#cfe9c8' }}
              dividerStyle={{ backgroundColor: 'grey' }}
            >

            <View>
              <Text>Info</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity 
                  style={[ styles.detailBtns, { backgroundColor: 'lightgrey' } ]}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image 
                      source={require('../../assets/images/OrderDetails/order-icon.png')}
                      // style={{ margin: 5 }}
                    />
                    <Text style={{ marginLeft: 5 }}> View order </Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[ styles.detailBtns, { marginLeft: 50, backgroundColor: 'lightgrey' } ]}
                  onPress={ this._pickupDetailMap }
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image 
                      source={require('../../assets/images/OrderDetails/map.png')}
                      style={{ width: 25, resizeMode: 'contain' }}
                    />
                    <Text style={{ marginLeft: 5 }}> Get directions </Text>
                  </View>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <TouchableOpacity 
                  style={[ styles.detailBtns, { backgroundColor: '#4cd645', width: width / 2 } ]}
                  onPress={ this._completePickup }
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image 
                      source={require('../../assets/images/OrderDetails/complete.png')}
                      // style={{ margin: 5 }}
                    />
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}> Complete pick up </Text>
                  </View>
                </TouchableOpacity>
                
            </View>

            </Card>

          </View>

        }

        


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'white',
  },
  detailBtns: {
    margin: 8,
    padding: 8,
    width: width / 3,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  }
  
});