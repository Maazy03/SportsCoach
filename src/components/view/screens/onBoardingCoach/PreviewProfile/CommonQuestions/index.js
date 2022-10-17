import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import R from '@components/utils/R';
import Accordion from 'react-native-collapsible/Accordion';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function CommonQuestions(props) {
  const {options, deleteFAQ, editItems} = props;
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section, index, isActive, sections) => {
    return (
      <>
        <View style={R.styles.rowView}>
          <View style={R.styles.twoItemsRow}>
            <Icon
              name={isActive ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
              type={'MaterialIcons'}
              color={R.color.black}
              size={20}
              iconStyles={{
                marginRight: R.unit.scale(16),
              }}
            />
            <Text
              variant={'body2'}
              font={'InterSemiBold'}
              color={R.color.black}
              align={'right'}
              transform={'none'}>
              {section.question}
            </Text>
          </View>
        </View>
      </>
    );
  };

  const renderContent = (section, index, isActive) => {
    return (
      <>
        <View style={styles.content}>
          <Text
            variant={'body2'}
            font={'InterRegular'}
            color={R.color.gray}
            align={'left'}
            transform={'none'}>
            {section?.answer}
          </Text>
        </View>
      </>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  return (
    <>
      <Accordion
        sections={options}
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
    </>
  );
}
export default CommonQuestions;

const styles = ScaledSheet.create({
  content: {
    paddingTop: R.unit.scale(10),
    paddingLeft: R.unit.scale(3),
  },
});
