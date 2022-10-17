import {Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';

const show = ({title, message, type = 'success', duration}) => {
  // 'info' | 'danger' | 'success' | 'warning' | 'default'

  showMessage({
    message: title ? title : '',
    description: message ? message : ' ',
    type: type,
    hideStatusBar: true,
    duration: duration ? duration : 2000,
    autoHide: true,
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      alignContent: 'center',
      height:
        message && message.length < 0 ? 70 : Platform.OS === 'ios' ? 120 : 70,
    },
    titleStyle: {
      paddingTop: message?.length > 0 ? 0 : 20,
    },
  });
};

export default {
  show,
};
