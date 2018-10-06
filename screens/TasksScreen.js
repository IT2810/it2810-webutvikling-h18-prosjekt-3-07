
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

class TasksScreen extends React.Component {
    static navigationOptions= {
      title: 'Tasks',
    };
    render() {
  
      return (
        <View style={styles.container}>
          <Text>Tasks screen</Text>
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