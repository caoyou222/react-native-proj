'use strict';
import React, { Component } from 'react';
import {Image, Text, StyleSheet, View, Dimensions,TouchableHighlight, ScrollView, Icon} from 'react-native';
class StepItem extends Component{
  render(){
    console.log("test")
    return(
      <View style={styles.container}>
            <View style={{marginTop:18, alignSelf:'center'}}>
              <Text style={styles.title}>STEP {this.props.id}</Text>
            </View>
            <View style={{marginTop:18, marginLeft:20, marginRight:20, alignSelf:'center'}}>
              <Text style={styles.instruction}>{this.props.detail}</Text>
            </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    width: Dimensions.get('window').width,
  },
  title:{
    fontSize: 18,
    alignSelf:'center',
    fontFamily: 'Avenir-Roman',
    color:'#43BCD3'
  },
  instruction:{
    fontSize: 18,
    alignSelf:'center',
    fontFamily: 'Avenir-Roman',

  },

});

module.exports = StepItem;