import React from "react";
import {
  AsyncStorage,
  FlatList,
  View,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  Text
} from "react-native";
import TodoItem from "./TodoItem";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

class TodoList2 extends React.Component {
  state = {
    taskList: [],
    text: "",
    remainingTasks: 0
  };

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );
    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    this.updateList();
  }

  checkRemainingTasks() {
    let result = 0;
    let object = this.state.taskList;
    object.forEach(function(arrayItem) {
      if (arrayItem.completed === false) {
        result++;
      }
    });
    AsyncStorage.setItem("remainingTasks", JSON.stringify(result));
    return result;
  }

  async addTask() {
    const newTask = {
      id: new Date(),
      text: this.state.text,
      completed: false
    };

    // adds newTask to our task array
    const taskList = [...this.state.taskList, newTask];

    // store in asyncStorage
    await AsyncStorage.setItem("taskList", JSON.stringify(taskList));

    this.updateList();
  }

  async updateList() {
    // retrieves taskList from storage
    let tasks = await AsyncStorage.getItem("taskList");
    // parses back to JS array (or empty array)
    let taskList = (await JSON.parse(tasks)) || [];
    // retrieves remainingTasks from storage
    let rTasks = await AsyncStorage.getItem("remainingTasks");
    let remainingTasks = await JSON.parse(rTasks);

    this.setState({
      taskList,
      remainingTasks
    });

    // set text to empty
    this.changeTextHandler("");
  }

  changeTextHandler = text => {
    this.setState({ text });
  };

  async deleteTask(id) {
    // find index of element with timestamp used as a parameter
    const index = this.state.taskList.findIndex(item => item.id === id);
    // remove the object at given index from taskList
    const remove = this.state.taskList.splice(index, 1);

    await AsyncStorage.setItem("taskList", JSON.stringify(this.state.taskList));

    this.updateList();
  }

  async completeTask(id) {
    // find index of element with timestamp used as a parameter
    const index = this.state.taskList.findIndex(item => item.id === id);

    // toggle true/false for task completed
    const updatedTask = {
      ...this.state.taskList[index],
      completed: !this.state.taskList[index].completed
    };
    console.log(taskList);

    // create copy of taskList
    const taskList = this.state.taskList.slice();
    //insert updatedTask at index id
    taskList[index] = updatedTask;

    await AsyncStorage.setItem("taskList", JSON.stringify(taskList));

    this.updateList();
  }

  // named it _renderItem to separate it from FlatLists built-in-method renderItem
  // renders our TodoItem and defines values for its props
  _renderItem = ({ item }) => (
    <TodoItem
      id={item.id}
      completed={item.completed}
      text={item.text}
      onComplete={() => this.completeTask(item.id)}
      onDelete={() => this.deleteTask(item.id)}
      checkRemainingTasks={() => this.checkRemainingTasks()}
    />
  );

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewMargin }]}
      >
        <Text>{this.checkRemainingTasks()}</Text>
        <FlatList
          data={this.state.taskList}
          keyExtractor={(item, index) => item.id}
          renderItem={this._renderItem}
        />

        <TextInput
          style={styles.textInput}
          onChangeText={text => this.changeTextHandler(text)}
          onSubmitEditing={() => this.addTask()}
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
  },
  textInput: {
    height: 50,
    paddingRight: 10,
    paddingLeft: 10,
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});

export default TodoList2;
