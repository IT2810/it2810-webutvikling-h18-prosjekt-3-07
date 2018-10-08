
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TodoList from '../components/TodoList';

class TasksScreen extends React.Component {
  constructor(props) {
    super(props);
    }
    static navigationOptions= {
      title: 'Tasks',
    };
    render() {
    
      return (
        <View style={styles.container}>
         <TodoList></TodoList>
        </View>

      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#fff',
    }
  });

  export default TasksScreen;