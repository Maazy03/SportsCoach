import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Keyboard} from 'react-native';
import BasicInfoTab from './BasicInfoTab';
import LocationTab from './LocationTab';
import IncludedTab from './IncludedTab';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import ProfileHeader from '@components/view/screens/Profile/ProfileBackHeader';
import HorizontalTab from '@components/common/HorizontalTab';

export default function EditLessonScreen(props) {
  const {navigation} = props;
  const [page, setPage] = useState(0);
  const [hideBtn, setHideBtn] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setHideBtn(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setHideBtn(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  let tabs = [
    {index: 0, title: 'Basic info'},
    {index: 1, title: 'What’s included'},
    {index: 2, title: 'Location'},
  ];

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarVisible: true,
      });
  }, [navigation]);

  const onTabChange = index => {
    setPage(index);
    if (index === 0) {
      scrollRef.current.scrollTo({x: 0});
    }
    if (index === 1) {
      scrollRef.current.scrollTo({x: R.unit.width(0.53)});
    }
    if (index === 2) {
      scrollRef.current.scrollTo({x: R.unit.width(0.8)});
    }
  };

  return (
    <SafeAreaView style={[R.styles.container, styles.mainLayout]}>
      <ProfileHeader title={'Edit Lesson Info'} navigation={navigation} />
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
          <BasicInfoTab hideBtn={hideBtn} />
        ) : page === 1 ? (
          <IncludedTab />
        ) : (
          <LocationTab hideBtn={hideBtn} />
        )}
      </View>
      <View style={styles.footerButton}>
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
    </SafeAreaView>
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
