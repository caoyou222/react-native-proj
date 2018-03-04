import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator} from 'react-navigation'
import home from './screens/home.js'
import active from './screens/active.js'
const Navi = StackNavigator({
  HM:{screen:home},
  AT:{screen:active},
})

export default class TestApp extends React.Component{
  render(){
    return <Navi/>;
  }
};
