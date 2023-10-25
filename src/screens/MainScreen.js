import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/general";
import typography from "../styles/typography";

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.header]}>All About Movies</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UserInteractionScreen")}
      >
        <Text style={styles.buttonText}>Interact</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MainScreen;
