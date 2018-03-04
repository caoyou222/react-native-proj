import React, { Component } from 'react';
import {Image, AsyncStorage, Text, StyleSheet, View, Dimensions, RefreshControl, ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Expo, {Audio} from 'expo';
import ScrollViewItem from './ScrollViewItem.js';
const soundObject = new Expo.Audio.Sound();
const info = [];
const audio = "https://cf-media.sndcdn.com/MqaAZcQXvFV5.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vTXFhQVpjUVh2RlY1LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1MjAxOTY1OTZ9fX1dfQ__&Signature=sXVd339xN6AfcI-SNZ9P-byTPbShma3nw~7vYasblQy7VWjjRG9cMRZGk3ZxC5S3NpY4agk-Wh69YNqSp1Kp-YdRQiCCTxE8tRBQ8uhEgn1b5gmXhNuEKOPEyLriKP-YSk9oHsKjDUOidUwAd6acJ8Jq63-cbvdsWYlfzCj3lLX6UE4oL0BbtaJw1hWZjhau4WIik~TtRNHYTU7PXlbGmRwDpmgvQHsQVL0Celv-eKoG~Qh5Lfzw2Xp1XuZ1iylGhxDSXRUQ0BPCSnvzwNHeB~~WLMcsNwNLS9JG4IutrbcLLyFejgQ51z-MZEgMhjcStGXgOa9G0qNY07e~h7bavQ__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ";
const server = 'https://plgaia-staging.herokuapp.com/api/v1/post_get_active/4Wa0y74X1mAKKIo2qgiWii';
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

_getStatus = async()=>{
  try{
      var st = await soundObject.getStatusAsync();
      var dr = st["playableDurationMillis"];
      var pg = (st["positionMillis"]/st["playableDurationMillis"]*100);
      this.setState({status:st, percentage:pg});
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
    return fetch(server,{
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
    this.interval = setInterval(() => this._getStatus(), 800);
    
}

  componentWillUnmount=()=>{
    this._stopSound();
    clearInterval(this.interval);
  }


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
  <View style={styles.box}>
  <View style={styles.bar}/>
    <View style={{position: 'absolute', width: `${this.state.percentage}%`, left: 20, height: 8, backgroundColor: 'lightgrey', borderRadius:50}} />
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
  box:{
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent:'center',
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor:'#FFE4D3'
  },
  bar:{
    backgroundColor:"#FBF7F6",
    height:8,
    width : Dimensions.get('window').width-40,
    borderRadius:50
  }


});