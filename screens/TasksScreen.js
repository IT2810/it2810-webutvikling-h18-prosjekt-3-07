
import React from 'react';
import {Text, View } from 'react-native';
import ScreenStyles from './ScreenStyle';

class TasksScreen extends React.Component {
    static navigationOptions= {
      title: 'Tasks',
    };
    render() {
  
      return (
        <View style={ScreenStyles.container}>
          <Text>Tasks screen</Text>
        </View>
      );
    }
  }

  export default TasksScreen;