import React from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
 
import ProgressBarAnimated from 'react-native-progress-bar-animated';
 
export default class PedometerProgressBar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      progress: props.steps,
    }
  }
  componentWillReceiveProps(newProp) {
      this.setState({progress: (newProp.steps/100)})
   }
   

  render() {
    const barWidth = Dimensions.get('screen').width - 30;
 
    return (
       
      <View style={styles.container}>
        <View>
          <ProgressBarAnimated
            width={barWidth}
            value={this.state.progress}
            backgroundColor='#47d147'
          />
        </View>
        <Text style={styles.text}>{this.state.progress}
          <Text>% completed</Text>
        </Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    padding: 15,
  },
  text: {
    color: '#8492A6',
    fontSize: 20,
    fontWeight: 'normal',
  },
});