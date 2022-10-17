import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import R from '@components/utils/R';
import {transactions} from '@components/constants';
import {TransactionErrorIcon} from '@components/utils/Svg';
import Text from '@components/common/Text';
import moment from 'moment';
import Divider from '@components/common/Divider';
import ToDoErrorDisplay from '@components/view/screens/ToDo/ToDoErrorDisplay';

function TransactionTab(props) {
  const {navigation} = props;

  return (
    <>
      <ScrollView
        style={[R.styles.container, styles.mainLayout]}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 100 : 20),
        }}>
        <View style={styles.contentView}>
          {false ? (
            <View
              style={{
                flex: 1,
              }}>
              <ToDoErrorDisplay
                icon={<TransactionErrorIcon width="100%" height="100%" />}
                heading={'You do not have any upcoming payouts'}
                isFooter={false}
                text={
                  'Once a student has booked a lesson with you, transaction information will appear here.'
                }
              />
            </View>
          ) : (
            <>
              <View style={[R.styles.rowView, styles.headingRow]}>
                <Text
                  font={'InterSemBold'}
                  variant={'body1'}
                  align={'left'}
                  color={R.color.gray}>
                  Date
                </Text>
                <Text
                  font={'InterSemBold'}
                  variant={'body1'}
                  align={'left'}
                  color={R.color.gray}>
                  Total
                </Text>
              </View>

              {transactions?.map((item, index, arr) => {
                return (
                  <>
                    <View style={[R.styles.rowView, styles.transactionRow]}>
                      <Text
                        font={'InterSemBold'}
                        variant={'body2'}
                        align={'left'}
                        color={R.color.blackShade4}>
                        {moment(item.date).format('DD MMM  YYYY')}
                      </Text>
                      <Text
                        font={'Sequel451'}
                        variant={'body2'}
                        align={'left'}
                        color={R.color.blackShade4}>
                        $ {item.value}
                      </Text>
                    </View>
                    {index !== arr.length - 1 && (
                      <Divider lineStyles={{marginBottom: 0}} />
                    )}
                  </>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}
export default TransactionTab;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
  },
  contentView: {
    paddingHorizontal: R.unit.scale(16),
    width: '100%',
    flex: 1,
    marginTop: R.unit.scale(24),
  },
  headingRow: {
    marginBottom: R.unit.scale(24),
  },
  transactionRow: {
    paddingVertical: R.unit.scale(20),
  },
});
