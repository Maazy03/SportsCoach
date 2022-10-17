import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import Header from './Header';
import Footer from './Footer';

export default function BoilerModalOnBoard(props) {
  const {
    children,
    headerProps,
    onPressBackButton,
    onPressNextButton,
    rightButtonTitle,
    leftButtonTitle,
    disabled,
    onCloseModal,
    headerTitle,
  } = props;
  return (
    <SafeAreaView style={styles.background}>
      <Header onCloseModal={onCloseModal} headerTitle={headerTitle} />
      {children}
      <Footer
        rightButtonTitle={rightButtonTitle}
        leftButtonTitle={leftButtonTitle}
        onPressBackButton={onPressBackButton}
        onPressNextButton={onPressNextButton}
        disabled={disabled}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    // flex: 1,/
    alignItems: 'center',
    width: '100%',
    minHeight: 200,
  },
});
