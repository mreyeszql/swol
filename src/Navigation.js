import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import InitialScreen from 'screens/authentication/InitialScreen';
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
import ScanScreen from 'screens/home/workout/ScanScreen';
import ExerciseDetailScreen from 'screens/home/workout/ExerciseDetailScreen';
import PersonalRecordsScreen from 'screens/home/profile/PersonalRecordsScreen';

import { SimpleLineIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import ProfileScreen from 'screens/home/profile/ProfileScreen';
import SettingsScreen from 'screens/home/profile/SettingsScreen';
import CreateUsernameScreen from 'screens/authentication/CreateUsernameScreen';
import CreatePasswordScreen from 'screens/authentication/CreatePasswordScreen';
import ExperienceLevelScreen from 'screens/authentication/ExperienceLevelScreen';
import SelectGymScreen from 'screens/authentication/SelectGymScreen';
import PostWorkoutCameraScreen from 'screens/home/workout/PostWorkoutCameraScreen';



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
      {/* <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightning-bolt" size={size} color={color} />
          )
        }}
      /> */}
      {/* <Tab.Screen 
        name="Search" 
        component={SearchProfilesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="magnifier" size={size} color={color} />
          ),
        }}
      /> */}
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
          initialRouteName="Initial"
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Initial" component={InitialScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="Signin" component={SigninScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="CreateUsername" component={CreateUsernameScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="ConfirmSignup" component={ConfirmSignupScreen} />
          <Stack.Screen name="Tabs" component={TabNavigation} options={{gestureEnabled: false}} />
          <Stack.Screen name="Workout" component={WorkoutScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="Exercises" component={ExercisesScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="ExercisesSummary" component={ExercisesSummaryScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="Camera" component={CameraScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="Scan" component={ScanScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="PersonalRecords" component={PersonalRecordsScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="ExperienceLevel" component={ExperienceLevelScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="SelectGym" component={SelectGymScreen} options={{gestureEnabled: false}} />
          <Stack.Screen name="PostWorkoutCamera" component={PostWorkoutCameraScreen} options={{gestureEnabled: false}} />
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
