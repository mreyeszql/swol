import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignupScreen from 'screens/authentication/SignupScreen';
import SigninScreen from 'screens/authentication/SigninScreen';
import ConfirmSignupScreen from 'screens/authentication/ConfirmSignupScreen';
import TabScreen from 'screens/home/TabScreen';
import WorkoutsScreen from 'screens/home/workout/WorkoutsScreen';
import WorkoutScreen from 'screens/home/workout/WorkoutScreen';
import ExercisesScreen from 'screens/home/workout/ExercisesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={TabScreen} />
      <Tab.Screen name="Search" component={TabScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ConfirmSignup" component={ConfirmSignupScreen} />
        <Stack.Screen name="Tabs" component={TabNavigation} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Exercises" component={ExercisesScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Navigation = () => {
    return (
        <StackNavigation />
    );
}

export default Navigation;
