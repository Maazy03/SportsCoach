/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/index';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/store/index';
import {persistStore} from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {enableLatestRenderer} from 'react-native-maps';
import Toast from 'react-native-toast-message';
import {enableScreens} from 'react-native-screens';

import {Provider} from 'react-redux';
import {
  LogBox,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import {MenuProvider} from 'react-native-popup-menu';
// import {fcmSerice} from './src/store/notificationService/fcmService';
// import {localNotificationService} from './src/store/notificationService/localNotificationService';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreLogs(['EventEmitter.removeListener']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  let persistor = persistStore(store);
  useEffect(() => {
    SplashScreen.hide();
  });

  enableLatestRenderer();

  const toastConfig = {
    customToast: props => {
      const hideToast = () => {
        props.onPress();
      };
      return (
        <View
          style={{...styles.popUpContainer, ...props.props.containerStyles}}>
          <View
            style={{
              ...R.styles.twoItemsRow,
              flex: 1,
            }}>
            <View>{props.props.leftIcon}</View>
            <Text
              variant={'body3'}
              font={'InterSemiBold'}
              color={R.color.blackShade4}
              align={'left'}
              numberOfLines={3}
              style={{marginLeft: R.unit.scale(8), width: '80%'}}
              transform={'none'}>
              {props.text1}
            </Text>
          </View>

          <TouchableOpacity
            onPress={hideToast}
            style={{padding: R.unit.scale(5)}}>
            {props.props.rightIcon ? (
              props.props.rightIcon
            ) : (
              <Icon
                type={'Ionicons'}
                name={'close'}
                color={R.color.gray}
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
      );
    },
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={{flex: 1}}>
            <MenuProvider
              backHandler={() => {
                console.log('ASDASD');
              }}
              customStyles={{
                backdrop: {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  opacity: 0.5,
                },
              }}
              backdrop={{backgroundColor: 'red'}}>
              <AppNavigator />
            </MenuProvider>
          </SafeAreaView>
          <Toast config={toastConfig} />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </>
  );
};
const styles = StyleSheet.create({
  popUpContainer: {
    width: '85%',
    backgroundColor: R.color.white,
    borderRadius: R.unit.scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(16),
  },
});

export default App;
