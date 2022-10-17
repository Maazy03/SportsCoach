import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import R from '@components/utils/R';
import Accordion from 'react-native-collapsible/Accordion';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';
import CheckBox from '@components/common/CheckBox';

function SetLessonsCollapsible(props) {
  const {cardColor, onAddItemPress, options, item, updateItems} = props;
  const [activeSections, setActiveSections] = useState([]);
  const [secondId, setSecondId] = useState('');

  const selectedCheckBox = id => {
    updateItems(item?.id, secondId, id);
  };

  const activeItemId = index => {
    let selectedId = options[index].id;
    setSecondId(selectedId);
  };

  const addItems = data => {
    let id = data.id;
    let title = data.name;
    onAddItemPress(item?.id, id, title);
  };

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
                marginRight: R.unit.scale(15),
              }}
            />
            <Text
              variant={'body2'}
              font={'InterSemiBold'}
              color={R.color.black}
              align={'right'}
              transform={'none'}>
              {section.name}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              ...R.styles.twoItemsRow,
              paddingVertical: R.unit.scale(10),
            }}
            onPress={() => addItems(section)}>
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
      </>
    );
  };

  const renderContent = section => {
    return section?.items?.map(item => {
      return (
        <>
          <View style={[styles.content, R.styles.twoItemsRow]}>
            <CheckBox
              onPress={selectedCheckBox}
              id={item?.id}
              alreadySelected={item?.isChecked}
            />
            <Text
              variant={'body2'}
              font={'InterRegular'}
              color={R.color.black}
              align={'left'}
              style={{marginLeft: R.unit.scale(14)}}
              transform={'none'}>
              {item?.title}
            </Text>
          </View>
        </>
      );
    });
  };

  const _updateSections = activeSections => {
    if (activeSections?.length > 0 && activeSections !== undefined) {
      activeItemId(activeSections[0]);
    }
    setActiveSections(activeSections);
  };

  return (
    // <></>
    <Accordion
      sections={options}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={_updateSections}
      touchableComponent={TouchableOpacity}
      underlayColor={'none'}
      expandMultiple={false}
      touchableProps={{
        activeOpacity: 0.9,
      }}
      //   onAnimationEnd={item => console.log('LEVEL', item)}
      //   keyExtractor={(item, index) => console.log('ITEM', item, index)}
      sectionContainerStyle={{
        paddingVertical: R.unit.scale(24),
        borderBottomWidth: R.unit.scale(0.75),
        borderBottomColor: R.color.gray4,
      }}
    />
  );
}
export default SetLessonsCollapsible;

const styles = ScaledSheet.create({
  emptyBox: {
    backgroundColor: 'white',
    height: R.unit.scale(24),
    width: R.unit.scale(24),
    borderRadius: R.unit.scale(6),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(1),
  },
  content: {
    paddingTop: R.unit.scale(10),
    paddingBottom: R.unit.scale(14),
    paddingLeft: R.unit.scale(3),
  },
});
