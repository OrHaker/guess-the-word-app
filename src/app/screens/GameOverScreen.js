import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'

import { useDispatch, useSelector } from "react-redux";

import Button from '../components/Button';
import TextInput from './../components/TextInput';
import Screen from './../components/Screen';
import routes from "../navigation/routes"
import colors from './../utils/colors';

import { phoneValidation, usernameValidation } from './../utils/validations';
import { storeAsyncStorageData, retrieveAsyncStorageData } from '../utils/storage';
import { setUserMaxSequenceWinsAction, setWinnigDataAction } from './../store/actions/actions';

const GameOverScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");

    const { userMaxSequenceWins } = useSelector(state => state);

    const dispatch = useDispatch();

    const _handleTryAgain = async () => {
        try {
            const usernameValid = usernameValidation(username);
            const phoneValid = phoneValidation(phone);
            if (usernameValid && phoneValid) {
                const currData = { username, phone, highScore: userMaxSequenceWins };
                let data = await retrieveAsyncStorageData("winnigData");
                if (data) {
                    const sortedData = data.sort((a, b) => a.highScore > b.highScore ? 1 : -1);
                    data = [...sortedData, currData];
                }
                else data = [currData];
                await storeAsyncStorageData("winnigData", data);
                dispatch(setUserMaxSequenceWinsAction(0));
                dispatch(setWinnigDataAction(data));
                navigation.navigate(routes.GAME_SCREEN);
            }
            else if (!usernameValid) {
                alert("INVALID USERNAME");
            }
            else if (!phoneValid) {
                alert("INVALID PHONE");
            }
        } catch (error) {
            alert(error);
        }


    }


    return (
        <Screen style={styles.screen}>
            <Text style={styles.centerText}>Game Over!</Text>
            <Text style={styles.centerText}>{`You hit ${userMaxSequenceWins} points!`}</Text>

            <TextInput
                placeholder="Insert your name..."
                onChangeText={txt => setUsername(txt)}
            />
            <TextInput placeholder="Insert your phone..."
                onChangeText={txt => setPhone(txt)}
                keyboardType="numeric"
            />
            <Button title="Try again!" onPress={_handleTryAgain} />
        </Screen>
    )
}

export default GameOverScreen;

const styles = StyleSheet.create({
    centerText: {
        textAlign: "center",
        fontSize: 30
    }, screen: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light
    },
});
