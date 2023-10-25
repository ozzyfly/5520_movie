import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/general";
import typography from "../styles/typography";

function UserInteractionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={[typography.subtitle, { marginBottom: 20 }]}>
        Interact with Movies
      </Text>
      {/* Add interactive components or buttons here */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserInteractionScreen;
