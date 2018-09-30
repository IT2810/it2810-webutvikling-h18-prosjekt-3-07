import React from 'react';
//import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { HomeScreen, TasksScreen, CalendarScreen } from './screens';

//Screen navigation
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Tasks: TasksScreen,
    Calendar: CalendarScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      //Styling for navigationbar
      headerStyle: {
        backgroundColor: '#FFBA5C',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}


