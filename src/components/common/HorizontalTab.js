import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';

function HorizontalTab(props) {
  const {tabs, onTabChange, scrollRef, tabStyles} = props;
  const [page, setPage] = useState(0);

  const tabChange = index => {
    setPage(index);
    onTabChange(index);
  };

  return (
    <ScrollView
      horizontal={true}
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.horizontalScroll}>
      {tabs?.map((item, index) => {
        return (
          <TouchableOpacity
            style={[styles.tab, tabStyles]}
            activeOpacity={0.9}
            onPress={() => tabChange(index)}>
            <Text
              variant={page === index ? 'body2' : 'body3'}
              font={page === index ? 'InterSemiBold' : 'InterRegular'}
              color={page === index ? R.color.mainColor : R.color.gray}
              align={'left'}
              gutterBottom={8}
              transform={'none'}>
              {item.title}
            </Text>
            {page === index && <View style={styles.underLine} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
  },
  tab: {
    marginRight: R.unit.scale(80),
    paddingRight: R.unit.scale(5),
  },
  underLine: {
    backgroundColor: R.color.mainColor,
    height: R.unit.scale(4),
    borderTopRightRadius: R.unit.scale(2),
    borderTopLeftRadius: R.unit.scale(2),
    marginBottom: -10,
    width: '100%',
  },
});

export default HorizontalTab;
