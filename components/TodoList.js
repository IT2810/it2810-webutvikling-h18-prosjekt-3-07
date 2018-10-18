import React from "react";
import {
  FlatList,
  View,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  Text
} from "react-native";
import TodoItem from "./TodoItem";
import {countRemainingTasks, generateRemainingTaskText, updateTaskList, addTaskUtil, completeTaskUtil, deleteTaskUtil} from '../Utils/Utils';

const isAndroid = Platform.OS == "android";
const viewPadding = 0;

class TodoList extends React.Component {
  state = {
    taskList: [],
    text: "",
    remainingTasks: 0,
  };

  componentDidMount() {
    // listen to keyboard events emitted from device
    // increase padding if keyboard is showing
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    // remove padding if keyboard is hidden
    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );
    // get tasks from storage (if any)
    this.updateList();
  }

  componentWillUnmount() {
    Keyboard.removeListener();
  }

  // fetches from storage, parses and updates the state of taskList
  async updateList() {
    let taskList = await updateTaskList();
    // retrieves remainingTasks from storage
    let remainingTasks = await countRemainingTasks(taskList);

    this.setState({
      taskList,
      remainingTasks,
    });

    // set text to empty
    this.changeTextHandler("");
  }

  changeTextHandler = text => {
    this.setState({ text });
  };

  async addTask(text, taskListState) {
    await addTaskUtil(text,taskListState);
    // call on method to update tasklist after a task has been added
    this.updateList();
  }

  async deleteTask(id, taskListState) {
    await deleteTaskUtil(id, taskListState);
    this.updateList();
  }

  async completeTask(id, taskListState) {
    await completeTaskUtil(id, taskListState);
    this.updateList();
  }

  // named it _renderItem to separate it from FlatLists built-in-method renderItem
  // renders our TodoItem and defines values for its props
  _renderItem = ({ item }) => (
    <TodoItem
      id={item.id}
      completed={item.completed}
      text={item.text}
      onComplete={() => this.completeTask(item.id, this.state.taskList)}
      onDelete={() => this.deleteTask(item.id, this.state.taskList)}
    />
  );

  render() {
    let remainingTasks = this.state.remainingTasks;
    let taskList = this.state.taskList;
    let text = this.state.text;
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}
      >
        <Text style={styles.text}>{generateRemainingTaskText(remainingTasks, taskList)}</Text>

        <FlatList
          data={this.state.taskList}
          keyExtractor={(item, index) => item.id}
          renderItem={this._renderItem}
        />

        <TextInput
          style={styles.textInput}
          onChangeText={text => this.changeTextHandler(text)}
          onSubmitEditing={() => this.addTask(text, taskList)}
          value={this.state.text}
          placeholder="Add a task!"
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
    backgroundColor: "#F5FCFF",
    paddingTop: 5
  },
  textInput: {
    height: 50,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#e0e2e5",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  },
  text: {
    padding: 8,
    alignSelf: "center",
    fontSize: 14,
  }
});

export default TodoList;
