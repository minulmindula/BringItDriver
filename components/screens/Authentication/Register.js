

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage } from 'react-native';
import RF from 'react-native-responsive-fontsize';
import CodeInput from 'react-native-confirmation-code-input';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Register extends Component {

  constructor(props){
    super(props);

    this.state = {
      isverificationCodeEntered: false
    };
    
  }

  _onRegisterPressed = () => {
    this.props.navigation.navigate("Login",{screen: "Login"});
  }

  _onLoginPressed = () => {
    alert("Register");
  }

  _onGetStarted = () => {
    this.setState({isverificationCodeEntered: true});
  }



  render() {

    return (
      <View style={styles.container}>

          <Image
            source={ require('../../assets/images/logoDriver.png') } 
            style={{width: width / 2, height: height / 2, resizeMode: 'contain', marginTop: 30}}
          />

          {/* <CodeInput
            ref="codeInputRef1"
            secureTextEntry
            className={'border-b'}
            space={5}
            size={30}
            inputPosition='left'
            onFulfill={(code) => this._onFulfill(code)}
          /> */}
        
          {/* <TextInput
            style={[styles.textinputs, style={marginTop: -20}]}
            placeholder="Username"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({username:text})}

          /> */}

          {/* <TextInput
            style={[styles.textinputs, style={marginTop: -10}]}
            placeholder="Firstname"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({firstname:text})}

          />

          <TextInput
            style={styles.textinputs}
            placeholder="Lastname"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({lastname:text})}

          />    */}

          {
            this.state.isverificationCodeEntered 

            ?

           <View style={{ alignItems: 'center' }}>

            <Text style={{ fontSize: RF( 2.5 ), color: 'orange', marginBottom: 10 }}>* Enter the OPT code sent to your mobile via SMS *</Text>

            <TextInput
              style={styles.textinputs}
              placeholder="Verification code"
              placeholderTextColor='grey'
              keyboardType='numeric'
              maxLength={6}
              // value={this.state.mobileNumber}
              onChangeText={(text) => this.setState({mobile:text})}
            />   

            <View style={{marginLeft: 18, alignItems: 'center', alignSelf: 'center', marginTop: 20}}>
              <TouchableOpacity 
                  style={styles.button}
                  onPress={this._onLoginPressed}
              >
                  <Text style={{color: '#f5821b', padding: 7, fontSize: 28, fontWeight: 'bold'}}>Continue</Text>
              </TouchableOpacity>
            </View>


           </View>

            :

            <View style={{ alignItems: 'center', width: width / 1.1 }}>

              <Text style={{ fontSize: RF( 2.5 ), color: 'orange', marginBottom: 10 }}>* Enter your mobile number to get started *</Text>

              <TextInput
                style={styles.textinputs}
                placeholder="Mobile number"
                placeholderTextColor='grey'
                keyboardType='numeric'
                // value={this.state.mobileNumber}
                onChangeText={(text) => this.setState({mobile:text})}

              />    

              <View style={{marginLeft: 18, alignItems: 'center', alignSelf: 'center', marginTop: 20}}>
                  <TouchableOpacity 
                      style={styles.button}
                      onPress={this._onGetStarted}
                  >
                      <Text style={{color: '#f5821b', padding: 7, fontSize: 28, fontWeight: 'bold'}}>Get Started</Text>
                  </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{marginTop: '3%'}}>Already a member?</Text>
                <Text style={{color: '#f5821b',marginTop: '3%', marginLeft: '1%'}}
                onPress={this._onRegisterPressed}>Signin here</Text>
                {/* this.props.navigation.navigate("Register",{screen: "Register"}); */}
              </View>

            </View>


          }


          {/* <TextInput
            style={styles.textinputs}
            placeholder="Password"
            placeholderTextColor='grey'
            secureTextEntry={true}
            // value={this.state.password}
            onChangeText={(text) => this.setState({password:text})}
          />

          <TextInput
            style={styles.textinputs}
            placeholder="Re-enter Password"
            placeholderTextColor='grey'
            secureTextEntry={true}
            // value={this.state.password}
            onChangeText={(text) => this.setState({repass:text})}
          /> */}


          
          {/* <TouchableOpacity
            onPress={this._onRegisterPressed}
            style={[styles.button, {width: '20%', marginTop: 5}]}
          >
          <Text style={{alignSelf: 'center',color: 'white'}}>Sign up</Text>
          </TouchableOpacity> */}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: height,
    width: width,
    backgroundColor: 'white'
  },
  screenSize:{
    flex: 1,
    width: width,
    height: height,
    position: 'absolute'
  },
  innerContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgImages: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  logo: {
    width: '20%',
    height: '20%',
    flex: 1,
    resizeMode: 'contain', 
    marginBottom: '2%',
  },
  textinputs: {
    backgroundColor: 'white',
    paddingLeft: '4%',
    paddingRight: '4%',
    width: '90%',
    margin: '2%',
    color: 'grey',
    height: width / 12, 
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  button: {
    width: width / 2,
    alignSelf: 'center',
    alignItems: 'center'
  },
  buttonBottom: {
    marginTop: '4%',
    width: 100,
    borderRadius: 50,
    backgroundColor: '#387EE9'
  },
  bottomFlexRight:{
    position: 'absolute',
    bottom: 40,
    width: '45%',
    alignSelf: 'flex-start'
  },
  bottomFlexLeft:{
    position: 'absolute',
    bottom: 40,
    width: '40%',
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  roundButton:{
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20
  }
  
});