import React, { Component } from 'react';
import {Image, Text, StyleSheet, View, Dimensions,TouchableHighlight, ScrollView, Icon} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Button} from 'react-native-elements';
export default class active extends React.Component {
 constructor(props){
 super(props);
 this.state = {
 }; 
 }
 static navigationOptions = {
    title: 'Get Active',
    headerStyle: {backgroundColor: '#FFE4D3'},
    headerTitleStyle: {color:'black', fontSize:17},
    headerBackTitleStyle: {color: 'black'},
    headerTintColor: 'black',
 }

 
 render(){
 const { navigate } = this.props.navigation;
 const { params } = this.props.navigation.state;
 return (
 <View style={styles.container}>
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
  
});