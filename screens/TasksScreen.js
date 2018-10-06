
import React from 'react';
import {Text, View } from 'react-native';
import ScreenStyles from './ScreenStyle';
import TodoList from '../components/TodoList';
import AddTodoButton from '../components/AddTodoButton';

class TasksScreen extends React.Component {
  constructor(props) {
    super(props);
    }
    static navigationOptions= {
      title: 'Tasks',
    };
    render() {
    
      return (
        <View style={ScreenStyles.container}>
          <TodoList></TodoList>
          </View>
      );
    }
  }

  export default TasksScreen;