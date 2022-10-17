import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {login} from '@store/auth/authSlice';
import {clearCommon} from '@store/common/commonSlice';
import {clearCoach} from '@store/coach/coachSlice';
import Toast from '@components/common/Toast';
import {LogoHeader, LogoutIconAcc} from '@components/utils/Svg';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import {menuItems} from '@components/constants';

function ProfileScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(login({isAuth: false}));
    dispatch(clearCommon());
    dispatch(clearCoach());

    Toast.show({
      type: 'success',
      title: 'Logout',
      message: 'You are successfully logged out',
    });
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
        paddingBottom: R.unit.pdBottomList(70),
      }}>
      <View style={styles.formView}>
        <View style={R.styles.svgView}>
          <LogoHeader />
        </View>
        <View style={[R.styles.twoItemsRow, styles.nameView]}>
          <Image
            source={R.image.BaseBallSport()}
            style={{borderRadius: R.unit.scale(10)}}
          />
          <Text
            variant={'h3'}
            font={'Sequel551'}
            color={R.color.blackShade4}
            align={'left'}
            style={{flex: 1, marginLeft: R.unit.scale(16)}}
            transform={'none'}>
            Michael Baumgardner
          </Text>
        </View>

        <View style={[R.styles.rowView, styles.locationView]}>
          <Icon
            name={'star'}
            type={'Foundation'}
            color={R.color.mainColor}
            size={25}
            iconStyles={{marginRight: R.unit.scale(8)}}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.blackShade4}
              align={'left'}
              transform={'none'}>
              5.0
            </Text>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.gray}
              align={'left'}
              style={{
                marginLeft: R.unit.scale(4),
                textDecorationLine: 'underline',
              }}
              transform={'none'}>
              (7 reviews)
            </Text>
          </View>

          <View style={{...R.styles.dot, marginHorizontal: R.unit.scale(8)}} />

          <Text
            variant={'body3'}
            font={'InterSemiBold'}
            color={R.color.blackShade4}
            align={'left'}
            transform={'none'}>
            Tennis coach
          </Text>

          <View style={{...R.styles.dot, marginHorizontal: R.unit.scale(8)}} />

          <Text
            variant={'body3'}
            font={'InterSemiBold'}
            color={R.color.blackShade4}
            align={'left'}
            transform={'none'}>
            New York
          </Text>
        </View>

        <Divider />

        {menuItems?.map(item => {
          return (
            <TouchableOpacity
              style={[R.styles.twoItemsRow, styles.listView]}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate(item.screen);
              }}>
              <View style={[R.styles.svgView, styles.svgView]}>{item.svg}</View>
              <View>
                <Text
                  variant={'body2'}
                  font={'InterSemiBold'}
                  color={R.color.blackShade4}
                  align={'left'}
                  transform={'none'}>
                  {item?.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <Divider />
        <View>
          <TouchableOpacity
            style={[R.styles.twoItemsRow, styles.logoutView]}
            onPress={logOut}>
            <View style={[R.styles.svgView, styles.logoutsvgView]}>
              <LogoutIconAcc height="100%" width="100%" />
            </View>
            <View>
              <Text
                variant={'body2'}
                font={'InterSemiBold'}
                color={R.color.blackShade4}
                align={'left'}
                gutterBottom={4}
                transform={'none'}>
                LogOut
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  formView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  nameView: {
    marginTop: R.unit.scale(50),
  },
  locationView: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
    justifyContent: 'flex-start',
  },
  checkBoxTextView: {
    flexDirection: 'row',
    marginLeft: R.unit.scale(12),
    flex: 1,
    marginTop: R.unit.scale(2),
  },
  inputTextView: {
    marginLeft: R.unit.scale(35),
    marginBottom: R.unit.scale(24),
  },
  policyView: {
    marginBottom: R.unit.scale(24),
    alignItems: 'flex-start',
  },
  listView: {
    width: '100%',
    marginBottom: R.unit.scale(24),
  },
  logoutView: {
    width: '100%',
    marginBottom: R.unit.scale(24),
  },
  svgView: {
    height: R.unit.scale(30),
    marginRight: R.unit.scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoutsvgView: {
    height: R.unit.scale(30),
    marginRight: R.unit.scale(13),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: R.unit.scale(3),
  },
});
