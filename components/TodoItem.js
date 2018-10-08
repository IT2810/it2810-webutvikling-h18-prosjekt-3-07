import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import { CheckBox } from 'react-native-elements';

class TodoItem extends React.Component {
    
        constructor(props) {
            super(props)
        }
    
    render() {
        const isCompleted = this.props.completed ? 'line-through' : 'none';
        const textStyle = {
        fontSize: 20,
        textDecorationLine: isCompleted
    }; 
        return (  
            <View style={styles.container}>
                <View style={styles.listItemCount}>
                <CheckBox
                style = {{backgroundColor: "FFF"}}
                onPress= {() => this.props.onComplete(this.props.id)}
                checked = {this.props.completed}
                />
                
              <Text>
                {this.props.text}
              </Text>

              <TouchableOpacity
                onPress = {() => this.props.onDelete(this.props.id)}
                  style={{paddingLeft: 25, paddingRight: 15}}
                >
                <Text>X</Text>
              </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,  
      alignSelf: "stretch",
      justifyContent: "center",
      backgroundColor: "#F5FCFF",
      paddingTop: 20
    },
    list: {
        width: "100%"
  },

  listItemCount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },})
 
export default TodoItem;