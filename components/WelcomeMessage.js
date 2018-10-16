import React from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

class WelcomeMessage extends React.Component {
  state = {
    currentHour: 0
  };

  componentDidMount() {
    this.setState({
      currentHour: new Date().getHours()
    });
  }

  // checks time of day and set customisedMessage state
  checkTimeOfDay = () => {
    let currentHour = this.state.currentHour;
    console.log(currentHour);
    if (currentHour < 5) {
      return "Maybe time to get some sleep? 😴 ";
    } else if (currentHour < 12) {
      return "Good morning! \nLet's get started checking off tasks ✅";
    } else if (currentHour < 19) {
      return "Good afternoon! \nKeep up the good work 💪 ";
    } else {
      return "Good evening! \nTime to relax 😊";
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.text}>{this.checkTimeOfDay()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    paddingBottom: 50,
    lineHeight: 30,
    width: 0.7 * screenWidth
  }
});

export default WelcomeMessage;
