# Habitat Logistics

React Native mobile app built using Expo. Tested on ios simulator. Please run on the ios simulator. Uses google maps, google places, geocode, and directions API.

## Issues

1. Added custom marker with alphabetic letters to react-native-maps caused performace to slow down significantly. Need to debug. Here's the issue: https://github.com/react-native-maps/react-native-maps/issues/3098

## Visuals

<span style="display:block" class="note">

  <img src="https://voiceblasts1.s3.amazonaws.com/Simulator+Screen+Shot+-+iPhone+12+Pro+Max+-+2021-03-29+at+08.36.30.png" height="300px">
  <img src="https://voiceblasts1.s3.amazonaws.com/Simulator+Screen+Shot+-+iPhone+12+Pro+Max+-+2021-03-29+at+08.37.07.png" height="300px">

</span>

[link to recording of resorting tasks](https://voiceblasts1.s3.amazonaws.com/Simulator+Screen+Recording+-+iPhone+12+Pro+Max+-+2021-03-29+at+08.57.38.mp4)

## Run Locally

```
$ npm install
$ expo start
```

You will need to use your google maps, places, and geocode API keys.

## Libraries

1. react-native-maps: https://github.com/react-native-maps/react-native-maps

2. react-native-maps-directions: https://github.com/bramus/react-native-maps-directions

3. react-native-draggable-flatlist: https://github.com/computerjazz/react-native-draggable-flatlist
