// Food.js

import React from 'react';
import { View } from 'react-native';

const Food = ({ position }) => {
  return (
    <View
      style={{
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: "#333333", // Customize the appearance of the food
        left: position.x * 20, // Adjust the size of the food based on your game area
        top: position.y * 20,
      }}
    />
  );
};

export default Food;
