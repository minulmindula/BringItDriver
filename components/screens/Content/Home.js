

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView, BackHandler } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import Modal from "react-native-modal";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      // topBtnColorR: 'orange',
      // topBtnColorAll: 'lightgrey',
      // recommendedView: true,
      restaurantDetails: [],
      restaurantId: '',
      navBarIconClr: 'white',
      onIncomingDelivery: true,
      isErrorPopup: false
    };
    
  }

  componentDidMount()
  {
    // this.setState({ restaurantDetails: apiRest });
    // this._getRestaurants();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton );
  }

  handleBackButton() {
    BackHandler.exitApp();
  }

  _deliveryConfirm = () => {
    this.props.navigation.navigate('OrderConfirm');
  }

  _navigateOngoingDelivery = () => {
    this.props.navigation.navigate('OngoingDelivery', {screen: 'OngoingDelivery'} );
  }

  _onReject = () => {
    // this.setState({onIncomingDelivery: false});
    this.errorPopupShow();
  }

  errorPopupShow = () => {
    this.setState({
        isErrorPopup: true
    })
}

errorPopupHide = () => {
    this.setState({
        isErrorPopup: false
    })
}

  render() {

    // const {navigate} = this.props.navigation

    return (
      <View style={styles.container}>

        <View>
          <Image 
            style={{width: width, height: height / 1.8, resizeMode: 'stretch', position: 'absolute'}} 
            source={require('../../assets/images/Home/homeBg.jpg')} 
          />
        </View>

        <Header
          leftComponent={{icon:'menu', color: this.state.navBarIconClr, onPress: () => this.props.navigation.openDrawer() }}
          // centerComponent={{text: 'Home'}}
          rightComponent={{icon: 'notifications', color: this.state.navBarIconClr, onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{borderBottomColor: 'transparent', paddingBottom: 3, marginTop: -30}}
        />

        <View style={styles.innerContainer}>

          <Image 
            source={require('../../assets/images/Home/userIcon.png')}
            style={{width: width / 2.5, height: height / 5, resizeMode: 'contain'}}
          />

          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: RF(2.8), color: 'white', fontWeight: 'bold' }}>Driver Name</Text>
            <Text style={{ fontSize: RF(2.2), color: 'white' }}>driveremailadddress@bringit.com</Text>
          </View>

        </View>

        {
          !this.state.onIncomingDelivery 

          ?

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 70 }}>

         <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={ this._navigateOngoingDelivery }
         >
           <Image 
             source={require('../../assets/images/Home/ongoing.png')}
             style={{ width: width / 2, height: height / 5, resizeMode: 'contain' }}
           />
           <Text> Ongoing Deliveries </Text>
         </TouchableOpacity>

         <TouchableOpacity
          style={{ alignItems: 'center' }}
         >
           <Image 
             source={require('../../assets/images/Home/past.png')}
             style={{ width: width / 2, height: height / 5, resizeMode: 'contain' }}
           />
           <Text> Past Deliveries </Text>
         </TouchableOpacity>

        </View>

          :

          <View style={{ marginBottom: 30 }}>

            <Card title="Your have a new delivery" style={{ alignItems: 'center' }} containerStyle={{ borderRadius: 7 }} >

              <View style={{ flexDirection: 'row', marginBottom: 30 }}>

                <View style={{ width: width / 2.2, alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: RF(2.2), fontWeight: 'bold', color: '#a40000' }}> Pick up </Text>
                  <Text style={{ fontSize: RF(3.2), fontWeight: 'bold' }}> Rajagiriya </Text>
                </View>

                <View style={{ width: width / 2 }}>
                  <Text style={{ fontSize: RF(2.2), fontWeight: 'bold', color: '#a40000' }}> Drop off </Text>
                  <Text style={{ fontSize: RF(3.2), fontWeight: 'bold' }}> Nugegoda </Text>
                </View>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <TouchableOpacity
                  style={{ width: width / 4, height: height / 16, borderRadius: 5, backgroundColor: '#c91010', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginHorizontal: 10 }}
                  onPress={this._onReject}
                >
                  <Text style={{ color: 'white', fontSize: RF(2.8) }}> Reject </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ width: width / 2.5, height: height / 16, borderRadius: 5, backgroundColor: '#870707', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginHorizontal: 10 }}
                  onPress={this._deliveryConfirm}
                >
                  <Text style={{ color: 'white', fontSize: RF(2.8) }}> View Delivery </Text>
                </TouchableOpacity>

              </View>

            </Card>

            </View>

        }

        <Modal
            isVisible={this.state.isErrorPopup}
        >
            <Card
                containerStyle={{ borderRadius: 5 }}
            >
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/img.png')}
                        style={{ width: width / 2.2, height: height / 6, resizeMode: 'contain' }}
                    />
                    <Text style={{ fontSize: RF(3.5), fontWeight: 'bold', marginTop: 15 }}>
                        Server Error
                    </Text>
                    <Text style={{ textAlign: 'center' }}>
                        Our servers are busy at the moment. Please try again later!
                    </Text>
                    <TouchableOpacity 
                        onPress={this.errorPopupHide} 
                        style={{ marginTop: 25, paddingVertical: 8, paddingHorizontal: 15, backgroundColor: 'red', borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Ok</Text>
                    </TouchableOpacity>
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
  innerContainer:{
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  }
  
});