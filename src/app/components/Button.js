import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../utils/colors";

const Button = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;



const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginVertical: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderColor: colors.black,
        borderWidth: 1,
    },
    text: {
        color: colors.light,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",

    },
})



