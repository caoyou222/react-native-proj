import React, { Component } from 'react';
import {Image, Text, StyleSheet, View, Dimensions,TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Button} from 'react-native-elements';

export default class home extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 }; 
 }
 static navigationOptions = {
    header: null,
 }

 render(){
 const { navigate } = this.props.navigation;
 const { params } = this.props.navigation.state;
 return (
  <View style={styles.container}>
  <View style={styles.background}>
  <Image source={require('./ground.png')} style={styles.ground} />
  </View>
  <View style={styles.layer}>
  <Text style={styles.title}>Grow Together!</Text>
  <Image source={require('./biking.png')} style={styles.biking} />
  <View style={styles.buttonContainer}>
    <Button   
    title = "Get Started"
    color = "white"
    buttonStyle={styles.button}
    onPress={()=> navigate('AT')}
    />
  </View>
 </View>
</View>
 );
}
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  background:{
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent:'center',
  },
  title:{
    marginTop: 70,
    justifyContent: 'center',
    alignSelf:'center',
    fontSize: 25,
    color: 'black',
  },
  layer:{
    backgroundColor:'transparent',
  },
  buttonContainer: {
    backgroundColor:'transparent',
    overflow:'hidden',
  },
  biking:{
    marginTop: -70,
    width: Dimensions.get('window').width,
    resizeMode:"contain"
  },
  ground:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2.5,
    resizeMode:"cover",
    alignSelf:'center'
  },
  button:{
    backgroundColor: '#43BCD3',
    borderRadius: 30,
    width: 250,
    alignSelf:'center'
  }

});