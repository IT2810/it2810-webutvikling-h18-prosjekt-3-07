
import React from 'react';
import {Text, View } from 'react-native';
import ScreenStyles from './ScreenStyle';


class CalendarScreen extends React.Component {
  static navigationOptions= {
    title: 'Calendar',
  };
  render() {

    return (
      <View style={ScreenStyles.container}>
        <Text>Calendar Screen</Text>
      </View>
    );
  }
}
export default CalendarScreen;