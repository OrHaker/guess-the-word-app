
import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';

import Button from '../components/Button.js';
import Screen from './../components/Screen';
import UserKeyboard from "../components/Keyboard.js"
import Word from "../components/Word.js";

import { getRandomWord } from '../api/getRandomWord';
import routes from "../navigation/routes"
import { storeAsyncStorageData } from './../utils/storage';

import { useSelector, useDispatch } from "react-redux";
import { setUserMaxSequenceWinsAction } from './../store/actions/actions';



const GameScreen = ({ navigation }) => {
    const [mainWord, setMainWord] = useState("COFFE");
    const [mainDefinition, setMainDefinition] = useState("Brewed drink prepared from roasted coffee beans.");
    const [correctLetters, setCorrectLetters] = useState(["C", "F"]);
    const [wrongLetters, setWrongLetters] = useState([]);

    const { userMaxSequenceWins } = useSelector(state => state);
    const dispatch = useDispatch();

    const _handleGetNewWord = async () => {
        try {
            const res = await getRandomWord();
            if (res) {
                const { word, definition } = res[0];
                const newWord = word?.toUpperCase();
                let newCorrectLetters = newWord.split("")
                const mod = newCorrectLetters.length > 5 ? 3 : 2;
                newCorrectLetters = newCorrectLetters.filter((letter, i) => i % mod == 0 || letter === " ");
                setMainWord(newWord);
                setMainDefinition(definition);
                setCorrectLetters(newCorrectLetters);
                setWrongLetters([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const _handleOnKeyPress = item => {
        const { title } = item;
        if (mainWord.includes(title)) {
            setCorrectLetters([...correctLetters, title])
            _checkWin([...correctLetters, title]);
        }
        else {
            const newWrongLetters = [...wrongLetters, title];
            if (newWrongLetters.length >= mainWord.length) {
                alert("YOU LOSE");
                _handleGetNewWord();
                navigation.navigate(routes.GAME_OVER_SCREEN);
                return;
            }
            setWrongLetters(newWrongLetters);
        }
    }

    const _checkWin = async (newCorrectLetters) => {
        if (mainWord.split("").every(letter => newCorrectLetters.includes(letter))) {
            alert("YOU WIN");
            _handleGetNewWord();
            dispatch(setUserMaxSequenceWinsAction(userMaxSequenceWins + 1));
            try {
                await storeAsyncStorageData("userMaxSequenceWins", userMaxSequenceWins + 1);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Screen>
            <Text style={styles.centerText}> {`user wins ${userMaxSequenceWins}`}</Text>
            <Text style={styles.centerText}>{mainDefinition}</Text>
            <Word word={mainWord} correctLetters={correctLetters} />
            <Button title="GET NEW WORD" onPress={_handleGetNewWord} />
            <UserKeyboard onKeyPress={_handleOnKeyPress} correctLetters={correctLetters} wrongLetters={wrongLetters} />
        </Screen>
    );
};


const styles = StyleSheet.create({
    centerText: {
        textAlign: "center", fontSize: 20, marginHorizontal: 30
    }
});

export default GameScreen;
