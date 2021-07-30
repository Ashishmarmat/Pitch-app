import React from 'react';
import {Text} from 'react-native';

interface TextViewProps {
  text: string;
  color: String;
  style: object;
}

const defaultProps: TextViewProps = {
  text: '',
  color: '',
  style: {},
};

const TextView = (props: TextViewProps) => (
  <Text style={props.style}>{props.text}</Text>
);

TextView.defaultProps = defaultProps;

export default TextView;
