import React from "react";
import { View, StyleSheet } from "react-native";
import NavigationButton from "../components/NavigationButton";
import WelcomeMessage from "../components/WelcomeMessage";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <WelcomeMessage style={styles.message} />

          <View style={styles.buttonContainer}>
            <NavigationButton
              onPress={() => {
                this.props.navigation.navigate("Tasks");
              }}
              title="TODOs"
            />
            <NavigationButton
              onPress={() => {
                this.props.navigation.navigate("Pedometer");
              }}
              title="Pedometer"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 40
  },
  buttonContainer: {
    marginTop: 30
  }
});

export default HomeScreen;
