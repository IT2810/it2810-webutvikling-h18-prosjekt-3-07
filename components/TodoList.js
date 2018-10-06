import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from 'react-native-elements';
import StorageOperations from './StorageOperations';


const isAndroid = Platform.OS == "android";
const viewPadding = 10;

class TodoList extends React.Component {
  state = {
    tasks: [],
    text: "",
    completed: []
  };

  changeTextHandler = text => {
    this.setState({ text: text});
  }

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text, completed } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length.toString(), text: text, completed: completed }),
            text: "",
            completed: false
          };
        },
        () => StorageOperations.save(this.state.tasks)
      );
    }
  };

  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();
    
        tasks.splice(i, 1);

        return { tasks: tasks };
      
      },
      () => StorageOperations.save(this.state.tasks)
    );
  };

  componentDidMount() {
    StorageOperations.all(tasks => this.setState({ tasks: tasks || [] })); 
  }

  completeTask = index => {
    let completed = [...this.state.completed];
    completed[index] = !completed[index];
    this.setState({ completed });
  }

  render() {
    let { tasks, completed } = this.state;
    return ( <View
      style={[styles.container, { paddingBottom: this.state.viewMargin }]}
    >
      <FlatList
        extraData = {this.state}
        style={styles.list}
        data={this.state.tasks}
        renderItem={({ item, index }) =>
          <View>
            <View style={styles.listItemCount}>
            
            <CheckBox
                style={{backgroundColor: "#F5FCFF"}}
                checked={completed[index]}
                onPress= {() => this.completeTask(index)}/>

              <Text style={styles.listItem}>
                {item.text}
              </Text>
              <TouchableOpacity
                onPress={() => this.deleteTask(index)}
                style={{paddingLeft: 25, paddingRight: 15}}
              >
              <Text>X</Text>
              </TouchableOpacity>
              
            </View>
            <View style={styles.hr} />
            
          </View>}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={this.changeTextHandler}
        onSubmitEditing={this.addTask}
        value={this.state.text}
        placeholder="Add Tasks"
        returnKeyType="done"
        returnKeyLabel="done"
        
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 20,
  },
  hr: {
    height: 1,
    backgroundColor: "#d5d9e0"
  },
  listItemCount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 50,
    paddingRight: 10,
    paddingLeft: 10,
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});

export default TodoList;