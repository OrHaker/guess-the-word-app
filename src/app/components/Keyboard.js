import React from 'react'
import { StyleSheet, Dimensions, FlatList, View } from 'react-native'

import Button from './Button';

const windowWidth = Dimensions.get('window').width;
const numColumns = parseInt(windowWidth / 60);

const Keyboard = ({ onKeyPress, correctLetters, wrongLetters }) => {
    const caps = [...Array(26)].map((val, i) => { return { title: String.fromCharCode(i + 65) } });

    const renderKey = ({ item }) => !correctLetters.includes(item.title) && !wrongLetters.includes(item.title) ?
        <Button onPress={() => onKeyPress(item)} style={styles.button}  {...item} />
        :
        <View style={styles.button} />;


    return (
        <FlatList
            data={caps}
            renderItem={renderKey}
            numColumns={numColumns}
            keyExtractor={item => item.title}
            style={styles.flatList}
        />
    );
};

const styles = StyleSheet.create({
    button: { width: windowWidth / 7, borderRadius: 5, marginHorizontal: 5 },
    flatList: { position: "absolute", bottom: 0 }
});

export default Keyboard
