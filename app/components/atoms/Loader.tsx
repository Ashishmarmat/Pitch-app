import React from 'react';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

interface ActionButtonsProps {
  loader: boolean;
}

const defaultProps: ActionButtonsProps = {
  loader: false,
};

const Loader = (props: ActionButtonsProps) => {
  return (
    <Spinner
      visible={props.loader}
      textContent={'Loading...'}
      textStyle={styles.spinnerTextStyle}
    />
  );
};

Loader.defaultProps = defaultProps;
export default Loader;

let styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
});
