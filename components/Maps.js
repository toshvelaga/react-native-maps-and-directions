import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_API_KEY = ""; // add your google maps API KEY HERE //

class Maps extends Component {
  constructor(props) {
    super(props);

    this.mapView = null;
  }

  render() {
    return (
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={(c) => (this.mapView = c)}
        // onPress={this.onMapPress}
      >
        {this.props.coordinates.map((coordinate, index) => (
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate}>
            {/* <View style={styles.circle}>
              <Text style={styles.pinText}>{coordinate.letter}</Text>
            </View> */}
          </MapView.Marker>
        ))}
        {this.props.coordinates.length >= 2 && (
          <MapViewDirections
            origin={this.props.coordinates[0]}
            destination={
              this.props.coordinates[this.props.coordinates.length - 1]
            }
            waypoints={this.props.coordinates.slice(1, -1)}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="blue"
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`
              );
            }}
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);

              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
    );
  }
}

export default Maps;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: 450,
    marginBottom: 5,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "red",
  },
  pinText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
});
