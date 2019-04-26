

import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Image,
  TextInput, 
  TouchableOpacity,
  Dimensions, 
  AsyncStorage,
  ScrollView, 
  Linking
} from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import getDirections from 'react-native-google-maps-directions';
import Modal from "react-native-modal";

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
      currentLong: 0,
      isPickupCompletePopup: false,
      isDeliveryCompleted: false,
      isOngoingCompleted: false
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
    
    this.setState({
      isPickupCompletePopup: true
    })

  }

  _onClosePickup = () => {

    this.setState({
      isPickupCompletePopup: false
    })

  }

  _onConfirmPickup = () => {
    this.setState({ isPickupComplete: true });
    this.setState({isPickupCompletePopup: false});
  }

  _onConfirmDropOff = () => {
    this.setState({ isDeliveryCompleted: true });
  }

  _onCLoseDropOff = () => {
    this.setState({ isOngoingCompleted: true })
    this.setState({ isDeliveryCompleted: false });
    
  }

  _completedDropoff = () => {
    this.setState({ isDeliveryCompleted: true });
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
                containerStyle={{ borderRadius: 5, backgroundColor: '#fff' }}
                dividerStyle={{ backgroundColor: 'grey' }}
              >

              <View style={{ flexDirection: 'row', marginBottom: 20 }}>

              <View style={{ marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                  <Text>Username: </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                  <Text>City: </Text>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                  <Text>Order picked up at: </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                  <Text>Deliver order by:  </Text>
                </View>
              </View>

              <View style={{ marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: RF(2.8) }}>Minul Mindula</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: RF(2.8) }}>Jubilee Post</Text>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: RF(2.8) }}>12 : 57 PM</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: RF(2.8) }}>1 : 15 PM</Text>
                </View>
              </View>

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
                  style={[ styles.detailBtns, { marginLeft: 20, backgroundColor: 'lightgrey' } ]}
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
                  style={[ styles.detailBtns, { backgroundColor: 'lightgrey', width: width / 6, marginRight: 20 } ]}
                  onPress={()=>{Linking.openURL('tel: 123456')}}
                  // onPress={ this._completePickup }
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon 
                      // source={require('../../assets/images/OrderDetails/complete.png')}
                      name="phone"
                      color={'grey'}
                      // style={{ margin: 5 }}
                    />
                    {/* <Text style={{ marginLeft: 5, fontWeight: 'bold' }}> Complete pick up </Text> */}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[ styles.detailBtns, { backgroundColor: '#4cd645', width: width / 2 } ]}
                  onPress={ this._completedDropoff }
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image 
                      source={require('../../assets/images/OrderDetails/complete.png')}
                      // style={{ margin: 5 }}
                    />
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}> Complete drop up </Text>
                  </View>
                </TouchableOpacity>

              </View>

              </Card>

            </View>

          :

          <View>

            <Card 
              title="Pick up details"
              containerStyle={{ borderRadius: 5, backgroundColor: '#fff' }}
              dividerStyle={{ backgroundColor: 'grey' }}
            >

            <View style={{ flexDirection: 'row', marginBottom: 20 }}>

              <View style={{ marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                  <Text>Restaurant: </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                  <Text>City: </Text>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                  <Text>Order placed at: </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                  <Text>Pick up order by:  </Text>
                </View>
              </View>

              <View style={{ marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: RF(2.8) }}>Burger King</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: RF(2.8) }}>Nugegoda</Text>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: RF(2.8) }}>12 : 30 PM</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: RF(2.8) }}>1 : 00 PM</Text>
                </View>
              </View>

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
                  style={[ styles.detailBtns, { marginLeft: 20, backgroundColor: 'lightgrey' } ]}
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
                  style={[ styles.detailBtns, { backgroundColor: 'lightgrey', width: width / 6, marginRight: 20 } ]}
                  onPress={()=>{Linking.openURL('tel: 123456')}}
                  // onPress={ this._completePickup }
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon 
                      // source={require('../../assets/images/OrderDetails/complete.png')}
                      name="phone"
                      color={'grey'}
                      // style={{ margin: 5 }}
                    />
                    {/* <Text style={{ marginLeft: 5, fontWeight: 'bold' }}> Complete pick up </Text> */}
                  </View>
                </TouchableOpacity>

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

        <Modal isVisible={this.state.isPickupCompletePopup}>

          <Card>

            <View>
              <Text style={{ fontSize: RF(2.6), textAlign: 'center' }}>Reference no.</Text>
              <Text style={{ fontSize: RF(2.8), textAlign: 'center', fontWeight: 'bold' }}># MKT931G8KD334</Text>
              <Image 
                source={require('../../assets/images/OrderDetails/confirm.png')}
                style={{ width: width / 3, height: height / 4.5, marginVertical: 30, alignSelf: 'center' }}
              />
             <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                  style={{ backgroundColor: 'lightgrey', borderRadius: 5, padding: 8, justifyContent: 'center', marginTop: 20, marginHorizontal: 10 }}
                  onPress={this._onClosePickup}
                >
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: '#4cd645', borderRadius: 5, padding: 8, justifyContent: 'center', marginTop: 20, marginHorizontal: 10 }}
                  onPress={this._onConfirmPickup}
                >
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Confirm</Text>
                </TouchableOpacity>
             </View>
            </View>

          </Card>

        </Modal>

        <Modal isVisible={this.state.isDeliveryCompleted}>

          <Card>

            <View>

              <Text style={{ fontSize: RF(2.8), textAlign: 'center', fontWeight: 'bold' }}>The delivery is completed successfully!</Text>

              <Image 
                source={require('../../assets/images/OrderDetails/confirm.png')}
                style={{ width: width / 3, height: height / 4.5, marginVertical: 30, alignSelf: 'center' }}
              />
             <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{ backgroundColor: 'lightgrey', borderRadius: 5, padding: 8, justifyContent: 'center', marginTop: 20, marginHorizontal: 10 }}
                  onPress={this._onCLoseDropOff}
                >
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Okay</Text>
                </TouchableOpacity>
             </View>
            </View>

          </Card>

        </Modal>

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