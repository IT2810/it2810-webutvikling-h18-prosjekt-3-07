import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { Text, View, StyleSheet } from "react-native";

export default class PedometerSensor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0
    }
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  //Subscribe to pedometer updates
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({currentStepCount: result.steps});
    });
  
    //Check if pedometer is available.
    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({isPedometerAvailable: "Could not get isPedometerAvailable: " + error
      });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    // Set start and end date for step count. Is currently 24 hours. 
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.props.setSteps(result.steps);
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };
  
 //Unsubscribe to pedometer updates 
 _unsubscribe = () => {
  this._subscription && this._subscription.remove();
  this._subscription = null;
};


  render() {
    const recomendedSteps = 10000;
    return (
      <View>
        <Text style={styles.text1}>
          You have walked <Text style={styles.stepstext}> {this.state.pastStepCount + this.state.currentStepCount}</Text>
        </Text >
        <Text style={styles.text2}>
          steps the last 24 hours.
        </Text>
        <Text style={styles.text1}>
          Keep going! You have 
        </Text>
        <Text style={styles.stepstext}>
          {recomendedSteps - (this.state.pastStepCount + this.state.currentStepCount)} <Text style={styles.text2}> steps left.</Text>
        </Text> 
      </View>
    );
  }
}
const styles = StyleSheet.create({
  stepstext: {
    color: '#8492A6',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text1: {
    color: '#8492A6',
    marginTop: 20, 
    fontSize: 20,
  },
  text2: {
    color: '#8492A6',
    fontSize: 20,
    fontWeight: 'normal',
  },
});


Expo.registerRootComponent(PedometerSensor);