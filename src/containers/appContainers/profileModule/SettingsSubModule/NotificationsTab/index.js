import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import uuid from 'react-native-uuid';
import Button from '@components/common/Button';

import Divider from '@components/common/Divider';
import {BellIcon} from '@components/utils/Svg';
import Toggle from '@components/common/Toggle';

function NotificationsTab(props) {
  const [notiSettings, setNotiSettings] = useState([
    {
      title: 'Someone Message me',
      id: uuid.v4(),
      text1: 'Email',
      option1: true,
      text2: 'Desktop and mobile',
      option2: true,
    },
    {
      title: 'Anyone left me a review',
      id: uuid.v4(),
      text1: 'Email',
      option1: false,
      text2: 'Desktop and mobile',
      option2: true,
    },
    {
      title: 'Anyone accept or decline the lesson',
      id: uuid.v4(),
      text1: 'Email',
      option1: false,
      text2: 'Desktop and mobile',
      option2: true,
    },
    {
      title: 'Get Lytesnap news, announcements, and product updates',
      id: uuid.v4(),
      text1: 'Email',
      option1: true,
      text2: 'Desktop and mobile',
      option2: false,
    },
  ]);

  const toggleSwitch = (key, id) => {
    let obj = notiSettings.find(item => item.id === id);
    let check = obj[key];
    obj[key] = !check;
    setNotiSettings([...notiSettings]);
  };

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: R.unit.scale(50),
      }}>
      <View style={styles.formView}>
        <View style={styles.infoBox}>
          <View style={styles.svgView}>
            <BellIcon />
          </View>
          <Text
            variant={'body2'}
            font={'Sequel551'}
            color={R.color.blackShade4}
            align={'center'}
            gutterTop={24}
            transform={'none'}>
            You need to allow permission for notifications
          </Text>
          <Text
            variant={'body3'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'center'}
            gutterTop={8}
            gutterBottom={24}
            transform={'none'}>
            You need to allow permission for notifications
          </Text>
          <Button
            value={'Allow notifications'}
            bgColor={R.color.white}
            width={'100%'}
            size={'lg'}
            color={R.color.blackShade4}
            disabled={false}
            loaderColor={R.color.white}
            borderWidth={R.unit.scale(1)}
            borderColor={R.color.gray4}
          />
        </View>

        <Text
          variant={'body1'}
          font={'Sequel551'}
          color={R.color.blackShade4}
          align={'left'}
          gutterTop={8}
          gutterBottom={24}
          transform={'none'}>
          Notify me when:
        </Text>

        {notiSettings?.map((item, index) => {
          return (
            <View key={index}>
              <View>
                <Text
                  variant={'body1'}
                  font={'InterSemiBold'}
                  color={R.color.blackShade4}
                  align={'left'}
                  gutterBottom={16}
                  transform={'none'}>
                  {item.title}
                </Text>

                <View
                  style={{
                    ...R.styles.rowView,
                    marginBottom: R.unit.scale(16),
                  }}>
                  <Text
                    variant={'body2'}
                    font={'InterRegular'}
                    color={R.color.gray}
                    align={'left'}
                    transform={'capitalize'}>
                    {item.text1}
                  </Text>
                  <Toggle
                    toggle={item.option1}
                    toggleSwitch={() => toggleSwitch('option1', item.id)}
                  />
                </View>
                <View
                  style={{
                    ...R.styles.rowView,
                    marginBottom: R.unit.scale(16),
                  }}>
                  <Text
                    variant={'body2'}
                    font={'InterRegular'}
                    color={R.color.gray}
                    align={'left'}
                    transform={'capitalize'}>
                    {item.text2}
                  </Text>
                  <Toggle
                    toggle={item.option2}
                    toggleSwitch={() => toggleSwitch('option2', item.id)}
                  />
                </View>
              </View>
              <Divider lineStyles={{marginBottom: R.unit.scale(24)}} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
export default NotificationsTab;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  svgView: {
    aspectRatio: 1,
    marginRight: R.unit.scale(16),
    height: R.unit.scale(30),
  },
  infoBox: {
    padding: R.unit.scale(24),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray4,
    borderRadius: R.unit.scale(10),
    marginBottom: R.unit.scale(32),
    alignItems: 'center',
    width: '100%',
  },
});
