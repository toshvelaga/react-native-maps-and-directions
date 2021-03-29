import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const PLACES_API_KEY = ""; // add your google places API KEY HERE //

const SearchDropdown = (props) => {
  const [searchKeyword, setsearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchLocation = async (text) => {
    setsearchKeyword(text);
    axios
      .request({
        method: "post",
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${PLACES_API_KEY}&input=${text}`,
      })
      .then((response) => {
        setSearchResults(response.data.predictions);
        setShowResults(true);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <>
      <TextInput
        value={searchKeyword}
        style={styles.input}
        underlineColorAndroid="black"
        placeholder={props.placeholder}
        placeholderTextColor="black"
        autoCapitalize="none"
        onChangeText={(text) => searchLocation(text)}
      />
      <View style={styles.autocompleteContainer}>
        {showResults && (
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={searchResults}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => {
                    props.addDestination(item.description);
                    setsearchKeyword(item.description);
                    setShowResults(false);
                  }}
                >
                  <Text style={styles.description}>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.place_id}
            style={styles.searchResultsContainer}
          />
        )}
      </View>
    </>
  );
};

export default SearchDropdown;

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 2,
  },
  searchResultsContainer: {
    width: "90%",
    backgroundColor: "#fff",
    position: "absolute",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 60,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 15,
    fontSize: 16,
  },
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: "#aaa",
    color: "#000",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#48a971",
    alignItems: "center",
    height: "100%",
  },
  input: {
    marginVertical: 5,
    height: 45,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    paddingLeft: 15,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
  },
});
