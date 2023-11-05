import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "../styles/general";
import { fetchNearbyCinemas } from "../utilities/mapsAPI";
import * as Location from "expo-location";

function NearbyCinemasScreen({ navigation }) {
  const [cinemas, setCinemas] = useState([]);
  const [region, setRegion] = useState(null);
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
      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

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
      ) : (
        <MapView
          style={{ width: Dimensions.get("window").width, height: 300 }}
          region={region}
          showsUserLocation={true}
        >
          {cinemas.map((cinema) => (
            <Marker
              key={cinema.place_id}
              coordinate={{
                latitude: cinema.geometry.location.lat,
                longitude: cinema.geometry.location.lng,
              }}
              title={cinema.name}
              description={cinema.vicinity}
            />
          ))}
        </MapView>
      )}
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
