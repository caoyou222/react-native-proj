'use strict';
import React, { Component } from 'react';
import {Image, Text, StyleSheet, View, Dimensions,TouchableHighlight, ScrollView, Icon} from 'react-native';
import StepItem from './StepItem.js';
class ScrollViewItem extends Component{
  renderItems(item,i){
    return <StepItem key={i} id={i} detail={item}/>;
  }
  render(){
    return(
      <View style={styles.container}>
            <View style={{marginTop:20}}>
              <Image style={styles.icon} source={{uri:'http:'+this.props.detail.image.url}} />
            </View>
            <View style={{marginTop:20}}>
              <Text style={styles.name}>{this.props.detail.name}</Text>
            </View>
            <View style={{marginLeft:20, marginRight:20}}>
              <Text style={styles.instruction}>{this.props.detail.instruction}</Text>
            </View>
            <View>
            {
              this.props.detail.steps.map((item,i)=>this.renderItems(item,i))
            }
            </View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    width: Dimensions.get('window').width,
    marginBottom: 40,
  },
  icon:{
    width: 150,
    height: 150,
    resizeMode:"contain",
    alignSelf:'center',
    borderRadius:70,
  },
  name:{
    fontSize: 25,
    alignSelf:'center',
    fontFamily: 'Avenir-Roman'
  },
  instruction:{
    fontSize: 18,
    alignSelf:'center',
    fontFamily: 'Avenir-Roman',
    marginTop:20,

  },

});

module.exports = ScrollViewItem;