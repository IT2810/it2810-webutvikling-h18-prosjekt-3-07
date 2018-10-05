import React from 'react';
import {View } from 'react-native';
import ScreenStyles from './ScreenStyle';
import Button from '../components/Button';

class HomeScreen extends React.Component {
    static navigationOptions= {
      title: 'Home',
    };
    render() {
      return (
        <View style={ScreenStyles.container}>
          <Button 
            onPress={() => {
              this.props.navigation.navigate('Tasks');
            }}
            title = "TODO'S"
          />
          <Button 
            onPress={() => {
              this.props.navigation.navigate('Calendar');
            }}
            title = "Go to  calendar"
          />
        </View>
      );
    }
  }

  export default HomeScreen;
