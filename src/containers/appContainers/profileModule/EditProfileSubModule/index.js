import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, View, Animated, Easing} from 'react-native';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import PhotosTab from './PhotosTab';
import PersonalInfoTab from './PersonalInfoTab';
import FaqTab from './FaqTab';
import {useIsFocused} from '@react-navigation/native';
import ProfileHeader from '@components/view/screens/Profile/ProfileBackHeader';
import HorizontalTab from '@components/common/HorizontalTab';

let isInitialRender = true;

export default function EditProfileScreen(props) {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const [page, setPage] = useState(0);
  const [hideBtn, setHideBtn] = useState(false);
  const scrollRef = useRef();

  const value = new Animated.Value(0);

  useLayoutEffect(() => {
    if (isInitialRender) {
      Animated.sequence([
        Animated.timing(value, {
          toValue: hideBtn ? 0 : 1,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(value, {
          toValue: hideBtn ? 0 : 1,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]).start();
    }
    isInitialRender = false;
  }, [hideBtn]);

  const translateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [R.unit.height(1), 0],
  });

  const opacity = value;

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarVisible: true,
      });
  }, [navigation, isFocused]);

  let tabs = [
    {index: 0, title: 'Personal Info'},
    {index: 1, title: 'Photo & Video'},
    {index: 2, title: 'FAQ'},
  ];

  const onTabChange = index => {
    setPage(index);
    if (index === 0) {
      scrollRef.current.scrollTo({x: 0});
    }
    if (index === 1) {
      scrollRef.current.scrollTo({x: R.unit.width(0.53)});
    }
    if (index === 2) {
      scrollRef.current.scrollTo({x: R.unit.width(0.53)});
    }
  };

  return (
    <View style={[R.styles.container, styles.mainLayout]}>
      <ProfileHeader title={'Edit Profile'} navigation={navigation} />
      <View style={styles.contentView}>
        <HorizontalTab
          tabs={tabs}
          onTabChange={onTabChange}
          scrollRef={scrollRef}
          tabStyles={{marginRight: R.unit.scale(120)}}
        />
      </View>
      <View style={{flex: 1}}>
        {page === 0 ? (
          <PersonalInfoTab setHideBtn={setHideBtn} hideBtn={hideBtn} />
        ) : page === 1 ? (
          <PhotosTab />
        ) : (
          <FaqTab setHideBtn={setHideBtn} hideBtn={hideBtn} />
        )}
      </View>

      <View style={[styles.footerButton]}>
        <Button
          value={'Save changes'}
          bgColor={R.color.mainColor}
          width={'100%'}
          size={'lg'}
          color={R.color.white}
          disabled={false}
          loaderColor={R.color.white}
        />
      </View>

      {/* {!hideBtn && (
        <Animated.View
          style={[styles.footerButton, {opacity, transform: [{translateY}]}]}>
          <Button
            value={'Save changes'}
            bgColor={R.color.mainColor}
            width={'100%'}
            size={'lg'}
            color={R.color.white}
            disabled={false}
            loaderColor={R.color.white}
          />
        </Animated.View>
      )} */}
    </View>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },

  contentView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(8),
  },
  horizontalScroll: {
    width: '100%',
    marginTop: R.unit.scale(16),
    height: R.unit.scale(40),
    borderBottomColor: R.color.gray2,
    borderBottomWidth: 1,
  },
  scrollContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    display: 'flex',
    paddingLeft: R.unit.scale(7),
    width: R.unit.width(0.45),
  },
  tab: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    height: '90%',
  },
  underLine: {
    backgroundColor: R.color.mainColor,
    height: R.unit.scale(4),
    borderTopRightRadius: R.unit.scale(2),
    borderTopLeftRadius: R.unit.scale(2),
    width: '100%',
  },
  footerButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: R.unit.scale(16),
    backgroundColor: R.color.white,
  },
});
