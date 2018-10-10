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
      currentStepCount: 0,
      totalStepCount: 0
    }
  }
  
  componentDidMount() {
    this._subscribe();
  }
  
  componentWillUnmount() {
    this._unsubscribe();
  }

  getTotalStepCount = (steps) => {

    let sum = 0;

    switch(steps.countType) {
      case 'current':
        sum = steps.count + this.state.pastStepCount;
        break;

      case 'past':
        sum = steps.count + this.state.currentStepCount;
      }

    this.setState({totalStepCount: sum})
    this.props.setSteps(sum);
  }

  //Subscribe to pedometer updates
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.getTotalStepCount({
        countType: 'current',
        count: result.steps
      })
      
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
    //Set start and end date for step count. Is currently 24 hours. 
    Pedometer.getStepCountAsync(start, end).then(
      result => {

        this.getTotalStepCount({
          countType: 'past',
          count: result.steps
        })

        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      },
    );
  };
  
 //Unsubscribe to pedometer updates 
 _unsubscribe = () => {
  this._subscription && this._subscription.remove();
  this._subscription = null;
};

//Conditional rendering based on how many steps you have taken
  getStepsText = () => {
    const recomendedSteps = 10000;
    let stepsLeft = recomendedSteps - this.state.totalStepCount;

    if (stepsLeft > 0) {
      return(
        <View>
          <Text style={styles.text1}>
            Keep going! You have 
          </Text>
          <Text style={styles.stepstext}>
            {recomendedSteps - this.state.totalStepCount} <Text style={styles.text2}> steps left.</Text>
          </Text> 
        </View>
      );
    } else {
      return(
        <View>
          <Text style={styles.text1}>
            Congratulations!
          </Text>
          <Text style={styles.text2}>
            You have reached the goal.
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.text1}>
          You have walked <Text style={styles.stepstext}> {this.state.totalStepCount}</Text>
        </Text >
        <Text style={styles.text2}>
          steps the last 24 hours.
        </Text>
          {this.getStepsText()}
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