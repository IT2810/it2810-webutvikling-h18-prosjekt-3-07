# Project 3 – PIMM with React Native
This is a school project for the course IT2810 Web Development. The goal of the project was to design and implement a Personal and Motivation Manager (PIMM) React Native app. 

## Getting Started

1. Download repository
2. run ```npm install```
3. run ```npm start```

## Prerequisites
These are the things you need to get the project running properly. 
- expo 
- node.js
- jest-expo
- react-native-progress-bar-animated
- React-navigation
- React-native-element

See the **Technology** section for more details on how to install and use the prerequisites. 

## Running the tests
To run all test:
```npm test```

To run one specific test file:
```npm test <filename>```

## Functionality
This PIMM mobile application lets you keep track of your todos and track how active you are. We decided to include a pedometer in the todo list, because it is a common issue in all of society that people are too inactive. We thought the pedometer would motivate people to get up and move. The app is only a prototype, and the functionality is therefore limited.

The app has the following functionality: 

**Todo list**
- A list of things you need to get done. It is possible to add and remove tasks, and to check a task as completed.
- When you’ve made some tasks, you get a message saying how many tasks you have left to complete, and a motivational message. 

**Pedometer**
- The user receives updated feedback on how many steps they have completed today.
- The user receives updated feedback on how many steps they have left, if it’s under 10 000 (the recommended number of steps per day). 
- If you reach the goal of 10 000 steps, you will get congratulation message.
- The progress bar displays how many percent steps you have taken out of 10 000 steps. If you reach the goal, the progress bar turns green.

## Components and code structure

### Structuring
For our code structure, we decided to separate our code into a components folder (the logic) and a screen folder (the views). The screen folder includes the components that represent the three different screens/views: ```HomeScreen.js``` which is the landing page of the app, and where one can navigate to all other screens. ```PedometerScreen.js``` shows the Pedometer, and ```TasksScreen.js``` shows the todo-list, and where one can add and remove tasks. ```Index.js``` is only used to export the three screens in such a way that makes them simple to import in ```RootStack.js```.

### Component structure

 - App
   - RootStack
      - HomeScreen
         - NavigationButton
         - WelcomeMessage
      - PedometerScreen
         - PedometerProgressBar
         - PedometerSensor
      - TasksScreen
         - TodoList
           - TodoItem

**App**
Root component of the application. 

**RootStack**
Imports the ```createStackNavigator``` function that provides a way for your app to transition between screens and manage navigation history. This component is rendered in the root component (App).

**HomeScreen**
Sends props to ```NavigationButton``` component which then navigates to the different screens, ```PedometerScreen``` or ```TasksScreen```. When we press one of the buttons on ```HomeScreen```, ```navigate()``` is called, and pushes a new route to the stack navigator, if it’s not already in the stack. If it’s in the stack, it jumps to that screen.

**NavigationButton**
A simple component that uses ```TouchableOpacity``` which behaves as a button. This is rendered in the ```HomeScreen``` component. 

**WelcomeMessage**
Renders a textual output based on the time of the day. The text is shown on the ```HomeScreen```.

**PedometerScreen**
Displays the two components ```PedometerProgressBar``` and ```PedometerSensor```. Receives the state ```currentStepCount``` as prop from ```PedometerSensor``` which in turn sends it down to ```PedometerProgressBar```. 

**PedometerSensor**
Contains the pedometer functionality for displaying steps. The ```Pedometer.watchStepCount()``` updates the ```currentStepCount``` state, which always starts at 0 when you start the app, and is updated as you start to walk. The ```Pedometer.getStepCountAsync()``` updates the ```pastStepCount``` state, which is the number of steps walked today, before you start the app. The function ```getTotalStepCount``` combine these two states into one ```totalStepCount```, which is the updated total number of steps taken. This state is sent as a prop to the ```PedometerProgressBar``` component through ```PedometerScreen```.

**PedometerProgressBar**
Contains the progress bar that uses the received prop from ```PedometerSensor```. This is set as the progress state and divided by 100 to display the percentage progress.

**TaskScreen**
Renders the ```TodoList``` component.

**TodoItem**
Each todo consist of a checkbox, text, and a delete icon. Methods ```onComplete()``` and ```onDelete()``` are triggered from this component and sent up to parent ```TodoList```. Also has id, completed, and text props which are set in ```TodoList```.

**TodoList**
Renders each ```TodoItem``` in a list. The logic for deleting, adding and marking todos as completed is found here. Keeps track of todos in the ```taskList``` state, which is an array of task objects. Sets the props for ```TodoItem```. 

## Technology

### React Native and Expo
For the project we used Expo-Cli (which includes all functionality from the previous create-react-native-app). The project is made with React Native.

### AsyncStorage 

To save app data between sessions we used AsyncStorage. AsyncStorage is a simple, asynchronous, persistent, key-value system that is global to the app. In our project we used the following methods:

- ```setItem()```:  sets the value for a key and returns a Promise object 
- ```getItem()```: fetches an item for a key and returns a Promise object 

For dealing with the promises that the methods return, we used the async/await syntax. By declaring a function ```async``` it ensures that the function returns a promise. The keyword ```await``` makes JavaScript wait until the promise is resolved and returns it result. 

We considered moving the AsyncStorage operations into a separate component, however, we decided due to the small size of our application that this was not necessary. Still, for a larger project we would put these operations in a separate util component. 

### Third-party components and libraries
Here are some tutorials on how you can use the same third-party components and libraries we have used in our project.

#### Jest
Jest is an open-source library for testing any Javascript code, but is especially well suited for react code testing. If you used create-react-app to make your app then Jest is automatically installed. In our project, we installed jest with the Expo preset to make it work with Expo using the command:

```npm i jest-expo --save-dev``` 

Make sure to also add

``` 'test': 'jest' ```

to ```scripts``` inside package.json, and that the Jest dependency inside ```package.json``` has the right preset (this should have been added during the installation):

```jest-expo```

#### React Native Elements
React Native Elements is cross platform React Native UI toolkit. In our project we used the library’s Checkbox component. Installing React Native Elements depends on your type of react native project. We’ll assume you’re using Expo or create-react-native-app (check out [this page](https://react-native-training.github.io/react-native-elements/docs/0.19.0/getting_started.html) if not!)  and in that case the project already includes react-native-vector-elements, so all you need to do is install react-native-elements like so:

```npm install --save react-native-elements```

Now that you’re ready to use it all you need to do is add an import statement in the component you want to use the element, e.g.:

```import { CheckBox } from ‘react-native-elements’;```

And then include it in your render method like so:

```
<Checkbox 
title=”This title shows next to checkbox”
checked = {this.state.checked}
/>
```

For more examples and details check out the full documentation. 

#### NativeBase.io
NativeBase is a an open source UI component library for React Native which is used to build native mobile apps for iOS and Android platforms. We used their <Icon> component in ```TodoItem```, however they have a lot of different UI components which you can check out [here](https://docs.nativebase.io/Components.html#Components). 

To use it in your React Native project: 

1. Navigate into a react native project.
2. Run ```npm install native-base --save```.
3. Install peer dependency: react-native link.

#### Expo Pedometer API
The Pedometer from Expo uses Core Motion on iOS or Google Fit on Android to get the user’s step count. The pedometer is provided by the npm package expo which means you’ll have to have Expo installed. To install Expo, run the command:

```npm install --save expo```

Import the libraries with:

```
import Expo from 'expo';
import { Pedometer} from 'expo';
```

We included the functions in [this example](https://docs.expo.io/versions/latest/sdk/pedometer), and made some changes to make it fit our purpose. For example you can change the ```start``` and ```end``` constants that is used as input in the ```Pedometer.getStepCountAsync()``` function, to change the time interval for the strep count. 

**Note!** When working with this pedometer, we found a few errors that is posted as issues on Expo’s github. This means they are still working on these errors. The errors are:

1.  **For Android only**: When you reload the app, you’ll get the error message: “Already managing a GoogleApiClient with id 0”. To solve this, you have to close the Expo project on your phone and open it again. This problem typically occurs when you try to change the code, and save it, before restarting Expo. 

2.  Sometimes when you run ```expo start``` the first time, and navigate to the ``Pedometer screen``, the number of steps is 0, even though you have walked more than this. The Pedometer is sometimes a bit slow, but if you go back to the main screen, and then to the ```pedometer screen``` again, you will get the correct updates. This problem mostly seems to occur on iOS. 

#### ProgressBarAnimated
The react-native-progress-bar-animated package offers different customizable and animated progress bars for react native. If you want to use this bar in your project, you can include the ```<ProgressBarAnimated>``` tag in your code, and add your choise of available props from [this list](https://www.npmjs.com/package/react-native-progress-bar-animated). We used the example for “Bar with backgroundColorOnComplete”, because we wanted the background color to change when we had completed the number of steps taken in one day. We collected props from the ```PedometerSensor``` component and used this to set the progress.
 
 To use this animated progress bar in your project you have to install the progress bar package:
 
```npm install --save react-native-progress-bar-animated```

and import the package with:

```import ProgressBarAnimated from 'react-native-progress-bar-animated';```

### Platform independent
Our app is platform independent, which means it can be used by both iOS and Android without any modification. A few of the elements are specific for ios or android, e.g. the close icon used in ```TodoItem```. 

### Use of Git and code structure 
During the project we used Git as our code repository. To delegate work, we defined smaller tasks that were divided between the group members. 

We used git's own "trello" board for Projects to keep track of which issues were currently being worked on. When someone assigned themselves to an issue, they would move the issue from **To do** to **In progress**. Our initial idea was that the issue would then be moved to **Testing** before it was moved to **Done** to indicate that the code was ready to be tested. However, we were unable to test parts of our code (because of problems with Jest+React Native amongst other things), so many issues were moved directly to **Done**. 

### Testing of the application

#### Snapshot-testing
To test the project we used Jests Snapshot-testing functionality. Once our basic screens and components were done, we created Snapshots of all, and used these to check for changes to the components during coding. All our tests can be found in the ```__tests__``` folder, and the Snapshots in the subfolder ```__snapshots__```.

#### Unit tests
