import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@containers/authContainers/loginScreen';
import signupScreen from '@containers/authContainers/SignUpModule/signUpScreen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@components/navigation/navigationService';
import SignUpAuthOptionsScreen from '@containers/authContainers/SignUpModule/signUpAuthOptionsScreen';
import SignupSelectRoleScreen from '@containers/authContainers/SignUpModule/signupSelectRoleScreen';
import SignUpSuccessScreen from '@containers/authContainers/SignUpModule/signUpSucessScreen';
import ForgetPasswordScreen from '@containers/authContainers/ForgetPasswordModule/forgetPasswordScreen';
import CheckEmailScreen from '@containers/authContainers/ForgetPasswordModule/checkEmailScreen';
import ResetPasswordScreen from '@containers/authContainers/ForgetPasswordModule/resetPasswordScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Login'}>
        <Stack.Screen name="SelectRole" component={SignupSelectRoleScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen
          name="SignUpAuthOptions"
          component={SignUpAuthOptionsScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={signupScreen} />
        <Stack.Screen name="SignupSuccess" component={SignUpSuccessScreen} />
        <Stack.Screen name="CheckEmail" component={CheckEmailScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
