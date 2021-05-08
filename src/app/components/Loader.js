import React from 'react'
import { View, StyleSheet } from "react-native";

import LottieView from 'lottie-react-native';

import colors from './../utils/colors';

const Loader = () => {
    return (
        <View style={styles.overlay}>
            <LottieView autoPlay loop source={require("../assets/words-2.json")} />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        backgroundColor: colors.overlay,
        height: "100%",
        opacity: 0.8,
        width: "100%",
        zIndex: 1,
    },
});
export default Loader;

