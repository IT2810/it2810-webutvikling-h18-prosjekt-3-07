import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { Text, View, StyleSheet } from "react-native";

export default class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

 // Subscribe to pedometer updates
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    //Check if pedometer is available.
    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    // Set start and end date for step count. Is currently 24 hours. 
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    const recomendedSteps = 10000;
    return (
      <View>
        <Text style={styles.text}>
          Steps taken in the last 24 hours: {this.state.pastStepCount + this.state.currentStepCount}
        </Text>
        <Text>You have: {recomendedSteps - (this.state.pastStepCount + this.state.currentStepCount)} steps left</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: 'red'

  }
});


Expo.registerRootComponent(PedometerSensor);