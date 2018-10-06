import React from 'react';
import { AsyncStorage } from 'react-native';

const StorageOperations = {
    convertToArrayOfObject(tasks, callback) {
      return callback(
        tasks ? tasks.split("||").map((task, i) => ({ key: i.toString(), text: task })) : []
      );
    },
    convertToStringWithSeparators(tasks) {
      return tasks.map(task => task.text).join("||");
    },
    all(callback) {
      return AsyncStorage.getItem("TASKS", (err, tasks) =>
        this.convertToArrayOfObject(tasks, callback)
      );
    },
    save(tasks) {
      AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
    }
  };

  export default StorageOperations;
 
