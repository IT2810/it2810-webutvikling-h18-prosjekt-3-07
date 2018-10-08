
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PedometerSensor from '../components/PedometerSensor';
import PedometerProgressBar from '../components/PedometerProgressBar';


class PedometerScreen extends React.Component {
  static navigationOptions= {
    title: 'Pedometer',
  };

  constructor (props) {
    super(props)
    this.state = {
      steps: 0,
    }
  }


  setSteps = (steps)  => {
    this.setState({steps: steps})
  }

  render() {

    return (
      <View style={styles.container}>
        <PedometerSensor setSteps={this.setSteps}/>
        <PedometerProgressBar steps={this.state.steps}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fff',
  }
});
export default PedometerScreen;