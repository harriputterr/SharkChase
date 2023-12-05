// Food.js

import React from 'react';
import { Text, View } from 'react-native';

const Food = ({ position }) => {
  return (
    <Text
      style={{
        position: 'absolute',
        fontSize: 15,
        left: position.x * 10, 
        top: position.y * 10,
      }}
    >🦈</Text>
  );
};

export default Food;
