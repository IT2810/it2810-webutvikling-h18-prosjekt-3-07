import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'native-base';


class TodoItem extends React.Component {
    
        constructor(props) {
            super(props)
        }
    
    render() {
        const isCompleted = this.props.completed ? 'line-through' : 'none';
        const isDone = this.props.completed ? '#e0e2e5' : 'black';
        
        return (  
            <View>
                <View style={styles.listItemCount}>
                <CheckBox
                onPress= {() => this.props.onComplete(this.props.id)}
                checked = {this.props.completed}
                containerStyle = { styles.checkBox }
                />
                
              <Text style= {{textDecorationLine: isCompleted, color: isDone}}>
                {this.props.text}
              </Text>

              <TouchableOpacity
                onPress = {() => this.props.onDelete(this.props.id)}
                style={{paddingLeft: 25, paddingRight: 15}}
                >
                <Icon ios="ios-close" android="md-close" style={styles.deleteIcon}/>
              </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: 18
  },
  listItemCount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  checkBox: {
      backgroundColor: "#F5FCFF",
      borderWidth: 0,
  },
  deleteIcon: {
      paddingTop: 2,
      paddingBottom: 2,
      color: 'red'
  }  })
 
export default TodoItem;