import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import SearchDropdown from "./components/SearchDropdown";
import PrimaryButton from "./components/PrimaryButton";
import Items from "./components/Items";
import axios from "axios";
import Maps from "./components/Maps";

// I commented out code that adds an alphabetical letter to the markers on the map
// Did this due to a performance bug. See README.md for more info

const GEOCODE_API_KEY = ""; // add your geocode API KEY HERE //

const App = () => {
  const [pickup, setPickup] = useState("");
  const [pickupLatLong, setPickupLatLong] = useState({});
  const [dropoff, setDropoff] = useState("");
  const [dropoffLatLong, setDropoffLatLong] = useState({});
  const [alphabetLetter, setAlphabetLetter] = useState("A");
  const [tasks, setTasks] = useState([]);

  const addToTasks = () => {
    if (pickup === "" || dropoff === "") {
      alert("Don't leave pickup or dropoff empty");
    } else {
      let taskArray = [
        {
          location: pickup,
          typeOfDelivery: "Pickup",
          latitude: pickupLatLong.lat,
          longitude: pickupLatLong.lng,
          // letter: alphabetLetter,
        },
        {
          location: dropoff,
          typeOfDelivery: "Dropoff",
          latitude: dropoffLatLong.lat,
          longitude: dropoffLatLong.lng,
          // letter: String.fromCharCode(alphabetLetter.charCodeAt() + 1),
        },
      ];
      setTasks(tasks.concat(taskArray));
      // incAlphabet();
    }
  };

  const getLatLong = (item, latLong) => {
    axios
      .request({
        method: "post",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${item}&key=${GEOCODE_API_KEY}`,
      })
      .then((response) => {
        latLong(response.data.results[0].geometry.location);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const latLongPickup = (state) => {
    setPickupLatLong(state);
  };

  const latLongDropoff = (state) => {
    setDropoffLatLong(state);
  };

  // const incAlphabet = () => {
  //   setAlphabetLetter((prevLetter) =>
  //     String.fromCharCode(prevLetter.charCodeAt() + 2)
  //   );
  // };

  return (
    <>
      <Maps coordinates={tasks} />
      <SearchDropdown
        addDestination={(item) => {
          setPickup(item);
          getLatLong(item, latLongPickup);
        }}
        value={pickup}
        placeholder={"Enter pickup location"}
      />

      <SearchDropdown
        addDestination={(item) => {
          setDropoff(item);
          getLatLong(item, latLongDropoff);
        }}
        value={dropoff}
        placeholder={"Enter dropoff location"}
      />

      <PrimaryButton onPress={addToTasks} title="Submit" />

      {/* use long press to move the pickup and dropoff items in flatlist */}
      <View style={styles.bottomViewContainer}>
        <Items onDragEnd={({ data }) => setTasks(data)} data={tasks} />
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  bottomViewContainer: {
    flex: 1,
    marginBottom: 20,
  },
});
