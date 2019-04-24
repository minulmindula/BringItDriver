

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class OrderConfirm extends Component {

  constructor(props){
    super(props);

    this.state = {

    };
    
  }

  componentDidMount()
  {
    // this.setState({ restaurantDetails: apiRest });
    // this._getRestaurants();
  }

  _onDeliveryConfirm = () => {
      this.props.navigation.navigate('OngoingDelivery', {screen: 'OngoingDelivery'} );
  }

  render() {

    return (
      <View style={styles.container}>

        {/* <Header
          leftComponent={{icon:'keyboard-arrow-left', color:'#565656', onPress: () => this.props.navigation.goBack() }}
          // centerComponent={{text: 'Home'}}
        //   rightComponent={{icon: 'notifications', color: '#565656', onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
        /> */}

        <TouchableOpacity 
            style={{ alignSelf: 'flex-start', margin: 15, backgroundColor: 'white', width: 40, height: 40, borderRadius: 50, elevation: 1, justifyContent: 'center' }}
            onPress={ () => this.props.navigation.goBack() }
        >

            <Icon 
                name="keyboard-arrow-left"
            />

        </TouchableOpacity>

        {/* <View style={{
        ...StyleSheet.absoluteFillObject
        }}>
            <MapView
                style={{...StyleSheet.absoluteFillObject}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 6.927079,
                    longitude: 79.861244,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View> */}
        <View style={{ flex: 1 }}>
            <Text> </Text>
        </View>

            <View style={{ marginBottom: 30 }}>

                <Card title="Incoming delivery details" style={{ alignItems: 'center' }} containerStyle={{ borderRadius: 7 }} >

                    <View style={{ flexDirection: 'row', marginBottom: 30 }}>

                        <View style={{ width: width / 2.2, alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: RF(2.2), fontWeight: 'bold', color: '#a40000' }}> Restaurant  </Text>
                            <Text style={{ fontSize: RF(2.8), fontWeight: 'bold' }}> Burger King </Text>
                        </View>

                        <View style={{ width: width / 2 }}>
                            <Text style={{ fontSize: RF(2.2), fontWeight: 'bold', color: '#a40000' }}> User </Text>
                            <Text style={{ fontSize: RF(3.2), fontWeight: 'bold' }}> Test user </Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <TouchableOpacity
                            style={{ width: width / 4, height: height / 16, borderRadius: 5, backgroundColor: '#c91010', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginHorizontal: 10 }}
                            // onPress
                        >
                            <Text style={{ color: 'white', fontSize: RF(2.8) }}> Reject </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={{ width: width / 4, height: height / 16, borderRadius: 5, backgroundColor: '#197b17', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginHorizontal: 10 }}
                        onPress={this._onDeliveryConfirm}
                        >
                            <Text style={{ color: 'white', fontSize: RF(2.8) }}> Accept </Text>
                        </TouchableOpacity>

                    </View>


                </Card>

            </View>

        
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
  innerContainer:{
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  }
  
});