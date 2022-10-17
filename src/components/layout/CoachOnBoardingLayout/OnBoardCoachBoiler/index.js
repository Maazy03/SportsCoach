import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, BackHandler} from 'react-native';
import OnBoardCoachFooter from '../OnBoardCoachFooter';
import OnBoardCoachHeader from '../OnBoardCoachHeader';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import CheckBoxLine from '@components/common/CheckBoxLine';
import {useEffect} from 'react';

export default function OnBoardCoachBoiler(props) {
  const {
    navigation,
    children,
    headerProps,
    onPressBackButton,
    onPressNextButton,
  } = props;

  const {isHeader, notchHeader} = headerProps;
  const [selected, setSelected] = useState(false);

  const checkBoxPress = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.background}>
      {notchHeader && (
        <View style={styles.notchHeader}>
          <Text
            variant={'h6'}
            font={'Sequel651'}
            color={R.color.blackShade4}
            align={'left'}
            transform={'none'}>
            Preview how your profile looks to students
          </Text>
          <CheckBoxLine
            onPress={checkBoxPress}
            text={'I confirm that my profile information is accurate'}
            selected={selected}
          />
        </View>
      )}
      {isHeader && (
        <OnBoardCoachHeader navigation={navigation} headerProps={headerProps} />
      )}
      {children}
      <OnBoardCoachFooter
        navigation={navigation}
        headerProps={headerProps}
        onPressBackButton={onPressBackButton}
        onPressNextButton={onPressNextButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: R.unit.width(1),
    backgroundColor: R.color.white,
    alignItems: 'center',
  },
  notchHeader: {
    backgroundColor: R.color.white,
    width: R.unit.width(1),
    height: R.unit.scale(124),
    position: 'absolute',
    top: 0,
    zIndex: 9999,
    borderBottomLeftRadius: R.unit.scale(16),
    borderBottomRightRadius: R.unit.scale(16),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: R.unit.scale(16),
  },
});
