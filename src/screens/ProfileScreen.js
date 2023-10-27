import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import colors from "../styles/colors";
import typography from "../styles/typography";
import general from "../styles/general";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <CustomButton title="Edit Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...general.container,
    ...general.center,
  },
  header: {
    ...typography.header1,
    color: colors.textPrimary,
    marginBottom: 20,
  },
});

export default ProfileScreen;
