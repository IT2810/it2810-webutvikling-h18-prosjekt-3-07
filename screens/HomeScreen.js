import React from 'react';
import {View, StyleSheet } from 'react-native';
import NavigationButton from '../components/NavigationButton';

class HomeScreen extends React.Component {
    static navigationOptions= {
      title: 'Home',
    };
    render() {
      return (
        <View style={styles.container}>
          <NavigationButton 
            onPress={() => {
              this.props.navigation.navigate('Tasks');
            }}
            title = "TODO'S"
          />
          <NavigationButton 
            onPress={() => {
              this.props.navigation.navigate('Pedometer');
            }}
            title = "Pedometer"
          />
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

  export default HomeScreen;
