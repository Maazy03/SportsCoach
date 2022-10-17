import React, {useState, useEffect} from 'react';
import R from '@components/utils/R';
import ToggleSwitch from 'toggle-switch-react-native';

const Toggle = props => {
  const {
    onColor = R.color.mainColor,
    offColor = R.color.gray4,
    size = 'medium',
    toggle = false,
    toggleSwitch,
  } = props;

  const [isToggle, setIsToggle] = useState(toggle);

  useEffect(() => {
    setIsToggle(toggle);
  }, [toggle]);

  const onChange = isOn => {
    // setIsToggle(isOn);
    toggleSwitch();
  };

  return (
    <ToggleSwitch
      isOn={isToggle}
      onColor={onColor}
      offColor={offColor}
      size={size}
      onToggle={onChange}
    />
  );
};

export default Toggle;
