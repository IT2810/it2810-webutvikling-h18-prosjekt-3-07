
import { createStackNavigator } from 'react-navigation';
import { HomeScreen, TasksScreen, PedometerScreen } from '../screens';

const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Tasks: TasksScreen,
      Pedometer: PedometerScreen,
    },
    {
      initialRouteName: 'Home',
      navigationOptions: {
        //Styling for navigationbar
        headerStyle: {
          backgroundColor: '#FFBA5C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
  );

  export default RootStack;