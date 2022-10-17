import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import {ReportErrorIcon} from '@components/utils/Svg';
import {profileReports} from '@components/constants';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';
import ToDoErrorDisplay from '@components/view/screens/ToDo/ToDoErrorDisplay';

function ProfileReports(props) {
  const {navigation} = props;
  const [text, setText] = useState('');
  const [filteredArray, setFilteredArray] = useState(profileReports);

  const onChange = value => {
    setText(value);
    if (value.length > 1) {
      let updatedArr = profileReports?.filter(item => {
        return item.title.toLowerCase().includes(value.toLowerCase());
      });
      if (updatedArr.length > 0) {
        setFilteredArray(updatedArr);
      } else {
        setFilteredArray([]);
      }
    } else {
      setFilteredArray(profileReports);
    }
  };

  const submitEvaluation = id => {
    const newData = filteredArray.slice(0);
    let isEval = newData.find(item => item.id === id).isEvaluated;
    newData.find(item => item.id === id).isEvaluated = !isEval;

    setFilteredArray(newData);
  };

  return (
    <View style={[R.styles.container, styles.mainLayout]}>
      <View style={styles.contentContainer}>
        <TextInput
          secureText={false}
          placeholder={'Search'}
          onChangeText={onChange}
          color={R.color.black}
          value={text}
          returnKeyType={'done'}
          iconName={'search'}
          iconType={'Fontisto'}
          alignItems={'center'}
          iconColor={R.color.blackShade4}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            // paddingBottom: R.unit.scale(50),
          }}>
          {filteredArray?.length === 0 ? (
            <View style={{flex: 1}}>
              <ToDoErrorDisplay
                icon={<ReportErrorIcon height="100%" width="100%" />}
                heading={'You have no profile reports'}
                text={'We will let you know if there are any issues.'}
              />
            </View>
          ) : (
            <>
              {filteredArray?.map((item, index, arr) => {
                return (
                  <View style={styles.notificationCard} key={index}>
                    <Text
                      variant={'body2'}
                      font={'InterRegular'}
                      color={R.color.blackShade4}
                      align={'left'}
                      gutterBottom={8}
                      transform={'none'}>
                      {item.title}
                    </Text>
                    {item.text && (
                      <Text
                        variant={'body2'}
                        font={'InterRegular'}
                        color={R.color.gray}
                        align={'left'}
                        transform={'none'}>
                        {item.text}
                      </Text>
                    )}

                    <View style={[R.styles.rowView, styles.buttonContainer]}>
                      <Button
                        value={'Contact us'}
                        bgColor={R.color.white}
                        width={'40%'}
                        size={'lg'}
                        font={'InterNormal'}
                        color={R.color.black}
                        disabled={false}
                        loaderColor={R.color.white}
                        btnWrapperStyles={{
                          justifyContent: 'flex-start',
                        }}
                        // onPress={onPressBackButton}
                      />
                      <Button
                        value={'Go to onboarding'}
                        bgColor={R.color.mainColor}
                        borderColor={R.color.mainColor}
                        font={'InterNormal'}
                        width={'60%'}
                        size={'lg'}
                        color={R.color.white}
                        disabled={false}
                        loaderColor={R.color.white}
                        borderWidth={1}
                        onPress={() => submitEvaluation(item.id)}
                      />
                    </View>
                    {index !== arr.length - 1 && <Divider />}
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
export default ProfileReports;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    paddingTop: R.unit.scale(16),
  },
  notificationCard: {
    marginTop: R.unit.scale(24),
  },
  buttonContainer: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
  },
  buttonLayout: {
    justifyContent: 'flex-end',
    width: '70%',
  },
});
