import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Word = ({ word = "COFFE", correctLetters = ["C", "F"] }) => {


  return (
    <View style={styles.sectionContainer}>
      {word.split('').map((letter, i) =>
        <Text style={[correctLetters.includes(letter) ? styles.letter : styles.unExistLetter, letter === " " ? styles.space : null]} key={i}>
          {letter}
        </Text>)
      }
    </View>);
};

const styles = StyleSheet.create({
  sectionContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: 'wrap',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  letter: {
    fontSize: 18,
    color: "#000",
    marginStart: 10,
  },
  unExistLetter: {
    fontSize: 18,
    color: "transparent",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginStart: 10,
  },
  space: { marginStart: "100%", borderBottomWidth: 0, }

});
export default Word;
