import React from "react"
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"
import HomeScreen from "./screens/home"
import StarScreen from "./screens/star"

export default function App() {
  return (
    <AppContainer/>
  );
}

const StackNavigator = createStackNavigator({
  Home: {screen:HomeScreen, navigationOptions:{headerShown:false}},
  Star: {screen:StarScreen, navigationOptions:{headerTitle:"",headerStyle:{backgroundColor:"#1A2D5F",borderWidth:0}}}
},
{
  initialRouteName:"Home"
}
)

const AppContainer = createAppContainer(StackNavigator)