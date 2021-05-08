import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";

import colors from './../utils/colors';

function AppTextInput({ width = "95%", onChangeText, color = colors.dark, multiline = false, style, ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        placeholderTextColor={colors.black}
        style={[styles.text, style, { width, color }]}
        multiline={multiline}
        {...otherProps}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    textAlign: "right",
    fontSize: 22,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    minHeight: 50,
    paddingHorizontal: 20,
  },
});

export default AppTextInput;
