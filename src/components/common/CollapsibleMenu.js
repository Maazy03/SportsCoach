import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import R from '@components/utils/R';
import Accordion from 'react-native-collapsible/Accordion';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function CollapsibleMenu(props) {
  const {cardColor, onAddItemPress} = props;
  const [activeSections, setActiveSections] = useState([]);
  const [fields, setFields] = useState([
    {title: 'Grips', isChecked: true},
    {title: 'Racquet string', isChecked: true},
    {title: 'Tennis Balls', isChecked: true},
    {title: 'Tennis racquet', isChecked: true},
  ]);

  const SECTIONS = [
    {
      title: 'Equipment',
      content: fields,
    },
    {
      title: 'Apparel',
      content: fields,
    },
    {
      title: 'Accessories',
      content: fields,
    },
  ];

  const renderHeader = (section, index, isActive) => {
    return (
      <View>
        <View style={R.styles.rowView}>
          <View style={R.styles.twoItemsRow}>
            <Icon
              name={isActive ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
              type={'MaterialIcons'}
              color={R.color.black}
              size={20}
            />
            <Text
              variant={'body2'}
              font={'InterSemiBold'}
              color={R.color.black}
              align={'left'}
              transform={'none'}>
              {section.title}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              ...R.styles.twoItemsRow,
              paddingVertical: R.unit.scale(10),
            }}
            onPress={onAddItemPress}>
            <Icon
              name={'add'}
              type={'Ionicons'}
              color={R.color.hyperLinkColor}
              size={12}
              iconStyles={{
                marginRight: R.unit.scale(7),
              }}
            />
            <Text
              variant={'body2'}
              font={'InterMedium'}
              color={R.color.hyperLinkColor}
              align={'left'}
              transform={'none'}>
              Add Item
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderContent = section => {
    return section?.content?.map(item => {
      return (
        <>
          <View style={[styles.content, R.styles.twoItemsRow]}>
            <Icon
              name={'add'}
              type={'Ionicons'}
              color={R.color.hyperLinkColor}
              size={12}
              iconStyles={{
                marginRight: R.unit.scale(7),
              }}
            />
            <Text
              variant={'body2'}
              font={'InterRegular'}
              color={R.color.black}
              align={'left'}
              transform={'none'}>
              {item?.title}
            </Text>
          </View>
        </>
      );
    });
  };

  const updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      sections={SECTIONS}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSections}
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
  );
}
export default CollapsibleMenu;

const styles = ScaledSheet.create({
  emptyBox: {
    backgroundColor: 'white',
    height: R.unit.scale(24),
    width: R.unit.scale(24),
    borderRadius: R.unit.scale(6),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(1),
  },
  header: {
    backgroundColor: 'red',
    padding: 10,
  },
  content: {
    // backgroundColor: 'purple',
    marginTop: R.unit.scale(14),
    paddingVertical: 10,
    marginBottom: 24,
  },
});
