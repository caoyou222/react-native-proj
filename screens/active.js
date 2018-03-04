import React, { Component } from 'react';
import {Image, AsyncStorage, Text, StyleSheet, View, Dimensions, RefreshControl, ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Button} from 'react-native-elements';
import Expo, {Audio} from 'expo';
import ScrollViewItem from './ScrollViewItem.js';
const soundObject = new Expo.Audio.Sound();
const info = [];
const audio = "https://mixtapemonkey.com/mixtapes/zip/637/Chance%20The%20Rapper-%20Acid%20Rap/01.%20Good%20Ass%20Intro%20(Prod.%20by%20Peter%20Cottontale,%20Cam%20for%20J.U.S.T.I.C.E%20League%20&%20Stefan%20Ponce)%20.mp3";
export default class active extends React.Component {
 constructor(props){
 super(props);
 this.state = {
  refreshing:false,
  sourceData:[],
  loaded:false,
  status:[],
  percentage:0,
 }; 
 }
 static navigationOptions = {
    title: 'Get Active',
    headerStyle: {backgroundColor: '#FFE4D3'},
    headerTitleStyle: {color:'black', fontSize:17},
    headerBackTitleStyle: {color: 'black'},
    headerTintColor: 'black',
 }

  _playSound = async(song) =>{
    try{
      await soundObject.loadAsync({uri:song},{shouldPlay:true});
      await soundObject.playAsync();
    }catch(error){
      console.log(error);
      
    }
  }


  _stopSound(){
    soundObject.stopAsync();
    soundObject.unloadAsync();
  }

  _onRefresh(){
    this.setState({refreshing:true});
    return fetch('https://plgaia-staging.herokuapp.com/api/v1/post_get_active/4Wa0y74X1mAKKIo2qgiWii',{
      method:"GET", 
      headers:{"authorization":"Token token=ZVKgYbjoOxoM9fvuhDvQOAtt", "content-type":"application/json"}})
    .then((res)=>res.json())
    .then((data)=>{
      console.log("in");
      this.setState({
        refreshing:false,
        sourceData: data.get_active,
      },function(){
        return AsyncStorage.setItem("info",JSON.stringify(this.state.sourceData))
        .then(json => console.log("success!"))
        .catch(error=>console.log("error!"))
      }
      )
      //console.log(this.state.sourceData);
    })
    .catch((error)=>{
      console.error(error);
    });
    //this._getInfo();
  }


  renderItems(item,i){
    return <ScrollViewItem key={i} detail={item}/>;
  }

  _getInfo = async()=>{
    try{
      console.log("get called");
      info = JSON.parse(await AsyncStorage.getItem('info'));
      console.log("in function");
      if(!info) {
        this._onRefresh();
      }

    }catch(error){
      console.log(error);
    }
    
  }

  componentDidMount=()=> {
    this._playSound(audio);
   
    
}

  componentWillUnmount=()=>{this._stopSound();}


 render(){
 const { navigate } = this.props.navigation;
 const { params } = this.props.navigation.state;
 this._getInfo();
 return (
 <View style={styles.container}>
  <ScrollView refreshControl={
      <RefreshControl
        refreshing = {this.state.refreshing}
        onRefresh = {this._onRefresh.bind(this)} 
        />
    }
>
  {
   info.map((item,i)=>this.renderItems(item,i))
  }
  </ScrollView>
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