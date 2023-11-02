import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../styles/general";
import { fetchNearbyCinemas } from "../utilities/mapsAPI";
import * as Location from "expo-location";

function NearbyCinemasScreen({ navigation }) {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log("Device Location:", latitude, longitude);

      const nearbyCinemas = await fetchNearbyCinemas(latitude, longitude);
      setCinemas(nearbyCinemas);
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Cinemas</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : cinemas.length > 0 ? (
        <FlatList
          data={cinemas}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.vicinity}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No cinemas found</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NearbyCinemasScreen;
