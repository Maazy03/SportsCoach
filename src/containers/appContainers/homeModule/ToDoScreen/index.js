import React, {useState, useRef} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import LessonRequests from './LessonRequests';
import StudentEvaluation from './StudentEvaluation';
import ProfileReports from './ProfileReports';
import HorizontalTab from '@components/common/HorizontalTab';

function ToDoScreen(props) {
  const {navigation} = props;
  const [page, setPage] = useState(0);
  const scrollRef = useRef();

  let tabs = [
    {index: 0, title: 'Lesson Requests'},
    {index: 1, title: 'Student Evaluation'},
    {index: 2, title: 'Profile reports'},
  ];

  const onTabChange = index => {
    setPage(index);
    if (index === 0) {
      scrollRef.current.scrollTo({x: 0});
    }
    if (index === 1) {
      scrollRef.current.scrollTo({x: R.unit.width(0.51)});
    }
    if (index === 2) {
      scrollRef.current.scrollTo({x: R.unit.width(0.8)});
    }
  };

  return (
    <SafeAreaView style={[R.styles.container, styles.mainLayout]}>
      <View style={styles.contentView}>
        <Text
          variant={'h3'}
          font={'Sequel551'}
          color={R.color.blackShade4}
          align={'left'}
          transform={'none'}>
          To-do
        </Text>

        <HorizontalTab
          tabs={tabs}
          onTabChange={onTabChange}
          scrollRef={scrollRef}
        />
      </View>
      <View style={{flex: 1}}>
        {page === 0 ? (
          <LessonRequests />
        ) : page === 1 ? (
          <StudentEvaluation />
        ) : (
          <ProfileReports />
        )}
      </View>
    </SafeAreaView>
  );
}
export default ToDoScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentView: {
    marginTop: R.unit.scale(32),
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    justifyContent: 'center',
  },
});
