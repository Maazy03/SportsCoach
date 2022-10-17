import {StyleSheet} from 'react-native';
import unit from './Unit';
import color from './Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: unit.scale(10),
  },
  rowView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  twoItemsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  twoItemsColumns: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: unit.scale(10),
    alignItems: 'center',
  },
  centeredView: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: color.black,
    width: '90%',
    marginLeft: unit.scale(12),
    height: 2,
  },
  dot: {
    height: unit.scale(4),
    width: unit.scale(4),
    backgroundColor: color.gray5,
    borderRadius: 29,
  },
  verticalDivider: {
    backgroundColor: color.gray,
    width: 1,
    height: 40,
  },
  pickupEllipse: {
    borderRadius: 100,
    backgroundColor: color.white,
    height: unit.scale(20),
    width: unit.scale(20),
    borderWidth: unit.scale(4),
    borderColor: color.mainColor,
    marginBottom: unit.scale(4),
  },
  disabledField: {
    justifyContent: 'center',
    borderColor: color.white,
    borderRadius: 40,
    width: unit.width(0.85),
    backgroundColor: color.white,
    paddingLeft: unit.scale(15),
    minHeight: unit.height(0.06),
    marginBottom: unit.scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: Platform.OS === 'ios' ? 20 : 100,
    elevation: 14,
  },
  svgView: {
    aspectRatio: 1,
    height: unit.height(0.03),
  },
  IOSOnlySStyles: {
    zIndex: Platform.OS === 'ios' ? 9999999 : 1,
  },
});

export default styles;
