import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Keyboard} from 'react-native';
import R from '@components/utils/R';
import PrivacyInfoTab from './PrivacyInfoTab';
import PayoutMethodsTab from './PayoutMethodsTab';
import NotificationsTab from './NotificationsTab';
import ProfileHeader from '@components/view/screens/Profile/ProfileBackHeader';
import HorizontalTab from '@components/common/HorizontalTab';

export default function SettingsScreen(props) {
  const {navigation} = props;
  const [page, setPage] = useState(0);
  const [hideBtn, setHideBtn] = useState(false);
  const scrollRef = useRef();

  let tabs = [
    {index: 0, title: 'Privacy settings'},
    {index: 1, title: 'Payout methods'},
    {index: 2, title: 'Notifications'},
  ];

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
      scrollRef.current.scrollTo({x: R.unit.width(0.53)});
    }
  };

  return (
    <SafeAreaView style={[R.styles.container, styles.mainLayout]}>
      <ProfileHeader title={'Profile Settings'} navigation={navigation} />

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
          <PrivacyInfoTab hideBtn={hideBtn} />
        ) : page === 1 ? (
          <PayoutMethodsTab />
        ) : (
          <NotificationsTab />
        )}
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
});
