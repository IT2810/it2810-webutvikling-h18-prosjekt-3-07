import React from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('window').width;

class WelcomeMessage extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() { 
        return ( 
            <View>
                <Text style={styles.text}>{this.props.customisedMessage}</Text>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    
  text: {
    fontSize: 24,
    paddingBottom: 50,
    lineHeight: 30,
    width: 0.7 * screenWidth,
  }})
 
export default WelcomeMessage;
