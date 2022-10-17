import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import ProfileHeader from '@components/view/screens/Profile/ProfileBackHeader';

function SeasonalStaticsScreen(props) {
  const {navigation} = props;
  const [page, setPage] = useState(0);
  const [hideBtn, setHideBtn] = useState(false);
  const scrollRef = useRef();

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

        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.horizontalScroll}>
          {tabs?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onTabChange(index)}
                activeOpacity={0.9}
                key={index}
                style={styles.tab}>
                <Text
                  variant={'body2'}
                  font={page === index ? 'InterSemiBold' : 'InterRegular'}
                  color={page === index ? R.color.mainColor : R.color.gray}
                  align={'left'}
                  gutterBottom={8}
                  lineHeight={24}
                  transform={'none'}>
                  {item.title}
                </Text>
                {page === index && <View style={styles.underLine} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={{flex: 1}}></View>
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

export default SeasonalStaticsScreen;
