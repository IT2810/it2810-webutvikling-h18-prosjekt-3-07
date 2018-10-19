import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native';

const screenWidth = Dimensions.get('window').width;

//Button component used on HomeScreen
class NavigationButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
            style={styles.button}
            onPress = {this.props.onPress} > 
            <Text style={styles.buttonText}>{this.props.title}</Text>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 0.7*screenWidth, 
        height: 40,
        backgroundColor: '#FFBA5C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#FFBA5C',
        borderWidth: 2,
        marginBottom: 20,
        
    },
    buttonText: {
        fontSize: 19,
        color: '#FFF'
    },
})

export default NavigationButton;