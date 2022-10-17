// import messaging from '@react-native-firebase/messaging';
// import React from 'react';
// import {Platform} from 'react-native';
// import navigationService from '../../navigationService';

// class FCMService {
//   register = (onRegister, onNotification, onOpenNotification) => {
//     this.checkPermission(onRegister);
//     this.createNotificationListeners(
//       onRegister,
//       onNotification,
//       onOpenNotification,
//     );
//   };

//   registerAppWithFCM = async () => {
//     if (Platform.OS === 'ios') {
//       // await messaging().registerDeviceForRemoteMessages();
//       await messaging().setAutoInitEnabled(true);
//     }
//   };

//   checkPermission = onRegister => {
//     messaging()
//       .hasPermission()
//       .then(enabled => {
//         if (enabled) {
//           this.getToken(onRegister);
//         } else {
//           this.requestPermission(onRegister);
//         }
//       })
//       .catch(error => {
//         console.log('[FCMService] Permission rejected ', error);
//       });
//   };

//   getToken = onRegister => {
//     messaging()
//       .getToken()
//       .then(fcmToken => {
//         if (fcmToken) {
//           onRegister(fcmToken);
//         } else {
//           console.log('[FCMService] User does not have a device token');
//         }
//       })
//       .catch(error => {
//         console.log('[FCMService] getToken rejected ', error);
//       });
//   };

//   requestPermission = onRegister => {
//     messaging()
//       .requestPermission()
//       .then(() => {
//         this.getToken(onRegister);
//       })
//       .catch(error => {
//         console.log('[FCMService] request Permission rejected ', error);
//       });
//   };

//   deleteToken = () => {
//     messaging()
//       .deleteToken()
//       .catch(error => {
//         console.log('[FCMService] delete Token rejected ', error);
//       });
//   };

//   createNotificationListeners = (
//     onRegister,
//     onNotification,
//     onOpenNotification,
//   ) => {
//     // When the application is running, but in background
//     messaging().onNotificationOpenedApp(remoteMessage => {
//       if (remoteMessage) {
//         const notification = remoteMessage.notification;
//         if (remoteMessage.data.Notification_type == 'PromotionalAds') {
//           // promotionalAds
//           onOpenNotification(notification);
//         } else {
//           navigationService.navigate('OrderStatusScreen');
//           return null;

//           // return;
//           // onOpenNotification(notification);
//         }
//         //   this.removeDeliveredNotification(notification.notificationId)
//       }
//     });

//     //When the application is opened from a quit state.
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           const notification = remoteMessage.notification;
//           if (remoteMessage.data.Notification_type == 'PromotionalAds') {
//             // promotionalAds
//             onOpenNotification(notification);
//           } else {
//             return navigationService.navigate('OrderStatusScreen');

//             // onOpenNotification(notification);
//           }
//           //   this.removeDeliveredNotification(notification.notificationId)
//         }
//       });

//     //Foreground State messages
//     this.messageListener = messaging().onMessage(async remoteMessage => {
//       if (remoteMessage) {
//         let notification = null;
//         if (Platform.OS === 'ios') {
//           notification = remoteMessage.data.notification;
//         } else {
//           notification = remoteMessage.notification;
//         }
//         onNotification(notification);
//       }
//     });

//     //Triggered when have new token
//     messaging().onTokenRefresh(fcmToken => {
//       console.log('[FCMService] New Token Refresh', fcmToken);
//       onRegister(fcmToken);
//     });
//   };

//   unRegister = () => {
//     this.messageListener();
//   };
// }

// export const fcmSerice = new FCMService();
