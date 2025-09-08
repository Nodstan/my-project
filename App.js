// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import Onboarding1 from './screens/Onboarding1';
import Onboarding2 from './screens/Onboarding2';
import Onboarding3 from './screens/Onboarding3';
import Onboarding4 from './screens/Onboarding4';
import SigninSignup from './screens/SigninSignup';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import CodeVerification from './screens/CodeVerification';
import FaceId from './screens/FaceId';
import Fingerprint from './screens/Fingerprint';
import MainTabs from './screens/MainTabs';
import Profile from './screens/Profile';
import Password from './screens/Password';
import SubTopic from './screens/SubTopic';
import QuizSetup from './screens/QuizSetup';
import Questions from './screens/Questions';
import Results from './screens/Results';
import Questions2 from './screens/Questions2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="Onboarding4" component={Onboarding4} />
        <Stack.Screen name="SigninSignup" component={SigninSignup} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="CodeVerification" component={CodeVerification} />
        <Stack.Screen name="FaceId" component={FaceId} />
        <Stack.Screen name="Fingerprint" component={Fingerprint} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="SubTopic" component={SubTopic} />
        <Stack.Screen name="QuizSetup" component={QuizSetup} />
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Questions2" component={Questions2} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
