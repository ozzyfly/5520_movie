import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/general.js";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
