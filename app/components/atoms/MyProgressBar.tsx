import * as Progress from 'react-native-progress';
import React from 'react';
import {Colors} from '../../theme';
import {verticalScale} from '../../theme/scale';

interface MyProgressBarProps {
  style: Object;
  progress: number;
  width: number;
}

const defaultProps: MyProgressBarProps = {
  style: {},
  progress: 0,
  width: 0,
};

const MyProgressBar = (props: MyProgressBarProps) => {
  return (
    <Progress.Bar
      progress={props.progress}
      unfilledColor={Colors.progressUnfilled}
      color={Colors.greenProgress}
      width={props.width !== 0 ? props.width : null}
      height={verticalScale(9)}
    />
  );
};

MyProgressBar.defaultProps = defaultProps;

export default MyProgressBar;
