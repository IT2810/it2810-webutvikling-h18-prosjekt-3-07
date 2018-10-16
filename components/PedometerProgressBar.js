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
      progressWithOnComplete: 0,
    }
  }
  componentWillReceiveProps(newProp) {
      this.setState({progress: (newProp.steps/100)})
   }

   checkGoalComplete = (progress) => {
     if (progress >= 100) {
       return 100
     }else {
      return progress
     }
   }
   
   

  render() {
    const barWidth = Dimensions.get('screen').width - 30;
    return (
       
      <View style={styles.container}>
        <View>
          <ProgressBarAnimated
            width={barWidth}
            value={this.checkGoalComplete(this.state.progress)}
            backgroundColor='#4d94ff'
            backgroundColorOnComplete='#47d147'
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
    paddingTop: 10,
    alignSelf: 'center',
    color: 'gray',
    fontSize: 20,
    fontWeight: 'normal',
  },
});