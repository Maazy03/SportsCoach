import {useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {},

  popInitialNotification: true,
  requestPermissions: true,
});

const LocalNotification = () => {
  let date = new Date();
  let time =
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' : '') +
    date.getMinutes();

  PushNotification.localNotification({
    channelId: 'channel-id-1',
    autoCancel: true,
    // largeIcon: 'ic_icon_ionic_md_megaphone',
    // smallIcon: 'ic_icon_ionic_md_megaphone',
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: time,
    title: 'Logout  ',
    message: 'You are logging out',
    vibrate: true,
    vibration: 300,
    soundName: 'default',
    playSound: true,
  });
};

export const notifications = () => {
  PushNotification.createChannel(
    {
      channelId: 'channel-id-1',
      channelName: 'My channel',
      channelDescription: 'A channel to categorise your notifications',
      playSound: false,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );

  LocalNotification();
  // LocalScheduleNotification();
};
