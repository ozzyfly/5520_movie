import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { updateUserData } from "../firebase/database";

const EditProfileScreen = ({ route, navigation }) => {
  const { userData } = route.params;
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);

  const handleSaveProfile = async () => {
    await updateUserData(userData.id, { name: name, email: email });
    navigation.goBack();
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} />
      <TextInput value={email} onChangeText={setEmail} />
      <Button title="Save Profile" onPress={handleSaveProfile} />
    </View>
  );
};

export default EditProfileScreen;
