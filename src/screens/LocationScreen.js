import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/general";
import typography from "../styles/typography";

function LocationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.header]}>Nearby Cinemas</Text>
      <Text style={[typography.body, { marginBottom: 20 }]}>
        Here you'd typically integrate a map showing nearby cinemas and movie
        theaters.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LocationScreen;
