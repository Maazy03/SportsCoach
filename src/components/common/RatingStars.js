import R from '@components/utils/R';
import React, {useEffect, useState} from 'react';
import {AirbnbRating} from 'react-native-ratings';

const RatingStars = props => {
  const {
    stars = 0,
    starSize = 24,
    ratingCallBack,
    fullStarColor = R.color.mainColor,
    emptyStarColor = R.color.gray4,
    disabled = false,
    starContainerStyles,
  } = props;

  const [starsCount, setStarsCount] = useState(stars);

  useEffect(() => {
    setStarsCount(stars);
  }, [stars]);

  const ratingStars = data => {
    ratingCallBack && ratingCallBack(data);
    setStarsCount(data);
  };

  return (
    <AirbnbRating
      count={5}
      isDisabled={disabled}
      showRating={false}
      defaultRating={starsCount}
      size={starSize}
      selectedColor={fullStarColor}
      unSelectedColor={emptyStarColor}
      starContainerStyle={{
        width: R.unit.scale(160),
        justifyContent: 'space-between',
        ...starContainerStyles,
      }}
      onFinishRating={rating => ratingStars(rating)}
    />
  );
};
export default RatingStars;
