
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PedometerSensor from '../components/PedometerSensor'


class PedometerScreen extends React.Component {
  static navigationOptions= {
    title: 'Pedometer',
  };
  render() {

    return (
      <View style={styles.container}>
        <PedometerSensor />
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
export default PedometerScreen;