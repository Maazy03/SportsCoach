import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Keyboard} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import AnalyticsTab from './AnalyticsTab';
import TransactionTab from './TransactionTab';
import HorizontalTab from '@components/common/HorizontalTab';

function InsightsScreen(props) {
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
    {index: 0, title: 'Analytics'},
    {index: 1, title: 'Transaction history'},
  ];

  const onTabChange = index => {
    setPage(index);
    if (index === 0) {
      scrollRef.current.scrollTo({x: 0});
    }
    if (index === 1) {
      scrollRef.current.scrollTo({x: R.unit.width(0.53)});
    }
  };

  return (
    <SafeAreaView style={[R.styles.container, styles.mainLayout]}>
      <View style={styles.contentView}>
        <Text
          variant={'h3'}
          font={'Sequel551'}
          gutterTop={24}
          color={R.color.blackShade4}
          align={'left'}
          transform={'none'}>
          Insights
        </Text>

        <HorizontalTab
          tabs={tabs}
          onTabChange={onTabChange}
          scrollRef={scrollRef}
          tabStyles={{marginRight: R.unit.scale(120)}}
        />
      </View>
      <View style={{flex: 1}}>
        {page === 0 ? <AnalyticsTab hideBtn={hideBtn} /> : <TransactionTab />}
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
    borderBottomColor: R.color.gray2,
    borderBottomWidth: 1,
  },
  scrollContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tab: {
    marginRight: R.unit.scale(80),
    paddingRight: R.unit.scale(5),
  },
  underLine: {
    backgroundColor: R.color.mainColor,
    height: R.unit.scale(4),
    borderTopRightRadius: R.unit.scale(5),
    borderTopLeftRadius: R.unit.scale(5),
    width: '100%',
  },
});

export default InsightsScreen;
