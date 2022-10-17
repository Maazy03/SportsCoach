import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import R from '@components/utils/R';
import {
  CheckIcon,
  LogoHeader,
  RocketLogo,
  SmileHighlighted,
  SmileIcon,
} from '@components/utils/Svg';
import Text from '@components/common/Text';
import {steps} from '@components/constants';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';

export default function App(props) {
  const {navigation} = props;
  const [activeSections, setActiveSections] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const renderHeader = (section, index, isActive, sections) => {
    return (
      <>
        <View
          style={{
            ...R.styles.rowView,
          }}>
          <View>
            <Text
              variant={'body4'}
              font={'InterMedium'}
              color={R.color.gray}
              gutterBottom={8}
              align={'left'}
              transform={'none'}>
              {section.step}
            </Text>
            <Text
              variant={'body1'}
              font={'Sequel651'}
              color={R.color.black}
              align={'left'}
              transform={'none'}>
              {section.heading}
            </Text>
          </View>
          <View style={R.styles.svgView}>
            <CheckIcon />
          </View>
        </View>
      </>
    );
  };

  const renderContent = (section, index, isActive, sections) => {
    return (
      <>
        <View style={styles.content}>
          {section?.things?.map((item, index, arr) => {
            return (
              <View
                style={{
                  ...R.styles.twoItemsRow,
                  marginBottom: index === arr.length - 1 ? 0 : 24,
                }}>
                <View style={styles.iconView}>
                  {item?.isChecked ? (
                    <Icon
                      name={'checkmark-sharp'}
                      type={'Ionicons'}
                      color={R.color.hyperLinkColor}
                      size={20}
                    />
                  ) : (
                    <View style={styles.unCheckedDot} />
                  )}
                </View>

                <Text
                  variant={'body2'}
                  font={'InterRegular'}
                  color={R.color.blackShade4}
                  align={'left'}
                  transform={'none'}>
                  {item?.title}
                </Text>
              </View>
            );
          })}
        </View>
      </>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const onSubmit = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <ScrollView
      style={[R.styles.container, styles.mainLayout]}
      vertical={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 0,
      }}>
      <View
        style={{
          width: '100%',
          backgroundColor: R.color.blueShade1,
        }}>
        <View
          style={{
            ...R.styles.svgView,
            marginTop: R.unit.scale(26),
            paddingLeft: R.unit.scale(16),
          }}>
          <LogoHeader />
        </View>
        <View style={R.styles.rowView}>
          <Text
            variant={'h1'}
            font={'Sequel451'}
            color={R.color.blackShade4}
            align={'left'}
            style={{width: '55%', paddingLeft: R.unit.scale(16)}}
            transform={'uppercase'}>
            One more Step to go!
          </Text>
          <View>
            <View>
              <RocketLogo />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contentView}>
        <View style={{paddingHorizontal: R.unit.scale(16)}}>
          <Accordion
            sections={steps}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={_updateSections}
            touchableComponent={TouchableOpacity}
            underlayColor={'none'}
            expandMultiple={true}
            touchableProps={{
              activeOpacity: 0.9,
            }}
            sectionContainerStyle={{
              paddingVertical: R.unit.scale(24),
              borderBottomWidth: R.unit.scale(0.75),
              borderBottomColor: R.color.gray4,
            }}
          />
          <View style={{...R.styles.twoItemsRow, marginTop: R.unit.scale(52)}}>
            <View
              style={{
                ...R.styles.svgView,
                height: 40,
              }}>
              {isCompleted ? (
                <SmileHighlighted height="100%" width="100%" />
              ) : (
                <SmileIcon height="100%" width="100%" />
              )}
            </View>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={isCompleted ? R.color.hyperLinkColor : R.color.gray}
              align={'left'}
              style={{
                marginLeft: R.unit.scale(16),
                fontStyle: 'italic',
                width: '90%',
              }}
              transform={'none'}>
              {isCompleted
                ? `Your application is on the review`
                : `You’ll be a Coach soon! Just add the last few details to your listings.`}
            </Text>
          </View>
        </View>

        <View style={styles.buttonLayout}>
          <Button
            value={'Finish'}
            bgColor={R.color.mainColor}
            width={'100%'}
            size={'lg'}
            color={R.color.white}
            disabled={false}
            loaderColor={R.color.white}
            onPress={onSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.green,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentView: {
    backgroundColor: R.color.white,
    width: R.unit.width(1),
    borderTopRightRadius: R.unit.scale(20),
    borderTopLeftRadius: R.unit.scale(20),
    marginTop: -20,
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingTop: R.unit.scale(16),
    paddingLeft: R.unit.scale(3),
    marginBottom: 24,
  },
  iconView: {
    width: R.unit.scale(20),
    marginRight: R.unit.scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  unCheckedDot: {
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray5,
    backgroundColor: R.color.gray6,
    width: R.unit.scale(8),
    height: R.unit.scale(8),
    borderRadius: 100,
  },
  buttonLayout: {
    paddingHorizontal: R.unit.scale(16),
    padding: R.unit.scale(16),
    borderTopWidth: R.unit.scale(0.75),
    borderTopColor: R.color.gray4,
  },
});
