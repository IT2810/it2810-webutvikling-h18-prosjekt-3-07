import React from 'react';
import {View, StyleSheet } from 'react-native';
import NavigationButton from '../components/NavigationButton';
import WelcomeMessage from '../components/WelcomeMessage';


class HomeScreen extends React.Component {
  
  state = { 
    customisedMessage: ""
 }  
  static navigationOptions= {
      title: 'Home',
    };
    
   componentDidMount() {
       this.checkTimeOfDay();
   }
  
  // check time of day and set customisedMessage state
  checkTimeOfDay = () => {
      let currentHour = new Date().getHours();
      if (currentHour < 5) {
        this.setState({
          customisedMessage: "Maybe time to get some sleep? 😴 "
      })
      }
      else if (currentHour < 12) {
          this.setState({
              customisedMessage: "Good morning! \nLet's get started checking off tasks ✅"
          })
      } else if (currentHour < 19) {
          this.setState({
              customisedMessage: "Good afternoon! \nKeep up the good work 💪 "
          })
      } else {
          this.setState({
              customisedMessage: "Good evening! \nTime to relax 😊"
          })
      }

  }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.messageContainer}>
            <WelcomeMessage style={styles.message} customisedMessage={this.state.customisedMessage}/>
          
          <View style={styles.buttonContainer}>
            <NavigationButton 
              onPress={() => {
                this.props.navigation.navigate('Tasks');
              }}
              title = "TODOs"
            />
            <NavigationButton 
              onPress={() => {
                this.props.navigation.navigate('Pedometer');
              }}
              title = "Pedometer"
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
      backgroundColor: "#fff",
    },
    messageContainer: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#fff',
      marginTop: 40,
    },
    buttonContainer: {
      marginTop: 30,
    }
  });

  export default HomeScreen;
