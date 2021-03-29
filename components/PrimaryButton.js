import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const PrimaryButton = (props) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={props.onPress}>
      <Text style={styles.submitButtonText}> {props.title} </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#4c8fe1",
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    height: 40,
    width: "90%",
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
