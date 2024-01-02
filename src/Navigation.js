import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SignupScreen from 'screens/authentication/SignupScreen';
import SigninScreen from 'screens/authentication/SigninScreen';
import ConfirmSignupScreen from 'screens/authentication/ConfirmSignupScreen';
import WorkoutsScreen from 'screens/home/workout/WorkoutsScreen';
import WorkoutScreen from 'screens/home/workout/WorkoutScreen';
import ExercisesScreen from 'screens/home/workout/ExercisesScreen';
import SearchProfilesScreen from 'screens/home/search/SearchProfilesScreen';
import FeedScreen from 'screens/home/feed/FeedScreen';
import ExercisesSummaryScreen from 'screens/home/workout/ExerciseSummaryScreen';
import CameraScreen from 'screens/home/feed/CameraScreen';

import { SimpleLineIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import ProfileScreen from 'screens/home/profile/ProfileScreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 0,
          backgroundColor: 'black',
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightning-bolt" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchProfilesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="magnifier" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Workouts" 
        component={WorkoutsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Signin"
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ConfirmSignup" component={ConfirmSignupScreen} />
          <Stack.Screen name="Tabs" component={TabNavigation} />
          <Stack.Screen name="Workout" component={WorkoutScreen} />
          <Stack.Screen name="Exercises" component={ExercisesScreen} />
          <Stack.Screen name="ExercisesSummary" component={ExercisesSummaryScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const Navigation = () => {
    return (
        <StackNavigation />
    );
}

export default Navigation;
