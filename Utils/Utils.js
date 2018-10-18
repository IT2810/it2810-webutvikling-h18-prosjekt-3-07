import { AsyncStorage } from 'react-native';

// Helper methods for TodoList component
/* Methods for keeping track of remaining tasks */
export function countRemainingTasks(tasks) {
    let result = 0;
    tasks.forEach(function(arrayItem) {
      if (arrayItem.completed === false) {
        result++;
      }
    });
    return result;
  };

  // Renders the top text in todo list
  export function generateRemainingTaskText(remainingTasks, taskList) {
    if (taskList.length == 0) {
      return (
        "Maybe you should add some tasks? 🤔"
      );
    }
    else if (remainingTasks == 1) {
      return (
        "You have " + remainingTasks + " task left. Almost there 😃"
      );
    } else if (remainingTasks > 1) {
      return (
        "You have " + remainingTasks + " tasks left. Keep going! 💪"
      );
    } else {
      return "You have completed all your task! Wohoo 👏";
    }
  }

  /* METHODS FOR ADDING, DELETING AND CHECKING OFF A TASK */

  export async function updateTaskList() {
    // retrieves taskList from storage
    let tasks = await AsyncStorage.getItem("taskList");
    // parses back to JS array (or empty array)
    let taskList = (await JSON.parse(tasks)) || [];

    return taskList;
  }

  export async function addTaskUtil(text, taskListState) {
    // create new task object
    const newTask = {
      id: new Date(),
      text: text,
      completed: false
    };

    // adds newTask to our task array
    const taskList = [...taskListState, newTask];

    // store in asyncStorage
    await AsyncStorage.setItem("taskList", JSON.stringify(taskList));
  };

  export async function completeTaskUtil(id, taskListState) {
    // find index of element with timestamp used as a parameter
    const index = taskListState.findIndex(item => item.id === id);

    // toggle true/false for task completed
    const updatedTask = {
      ...taskListState[index],
      completed: !taskListState[index].completed
    };

    // create copy of taskList
    const taskList = taskListState.slice();
    //insert updatedTask at index id
    taskList[index] = updatedTask;

    await AsyncStorage.setItem("taskList", JSON.stringify(taskList));
  }

  export async function deleteTaskUtil(id, taskListState) {
    // find index of element with timestamp used as a parameter
    const index = taskListState.findIndex(item => item.id === id);
    // remove the object at given index from taskList
    taskListState.splice(index, 1);

    await AsyncStorage.setItem("taskList", JSON.stringify(taskListState));
  }