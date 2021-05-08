import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, Animated } from 'react-native'

import { useDispatch, useSelector } from "react-redux";

import Screen from './../components/Screen';
import Button from './../components/Button';
import Loader from './../components/Loader';
import routes from "../navigation/routes"


import { retrieveAsyncStorageData } from '../utils/storage';

import { setUserMaxSequenceWinsAction, setWinnigDataAction } from './../store/actions/actions';
import colors from './../utils/colors';
import { removeAsyncStorageData } from './../utils/storage';


const IntroScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const logoAnime = useRef(new Animated.Value(0)).current;

    const _handleStartGame = () => navigation.navigate(routes.GAME_SCREEN);

    const _hnadleGoToTable = () => navigation.navigate(routes.SCORE_TABLE);
    const animatedStyle = {
        opacity: logoAnime,
        top: logoAnime.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 0],
        }),
    };


    useEffect(() => {
        (async () => {
            try {
                await retrieveAsyncStorageData("userMaxSequenceWins");
                removeAsyncStorageData("userMaxSequenceWins")
                const data = await retrieveAsyncStorageData("winnigData");
                if (data) dispatch(setWinnigDataAction(data));
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
                Animated.spring(logoAnime, {
                    toValue: 1,
                    tension: 30,
                    friction: 2,
                    duration: 2500,
                    useNativeDriver: false,
                }).start();
            }
        })();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <Screen style={styles.screen}>
            <Button style={styles.scoreTableIcon} title="SCORE TABLE ⚙" onPress={_hnadleGoToTable}></Button>
            <Animated.Image
                style={[styles.logo, animatedStyle]}
                source={require("../assets/blocks.png")}
            />
            <Button title="START GAME" onPress={_handleStartGame} />

        </Screen>
    )
}

export default IntroScreen;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light
    },
    centerText: {
        textAlign: "center",
        fontSize: 30,
        padding: 30,
        marginVertical: 10,
    },
    logo: {
        width: 200, height: 200, alignSelf: "center", marginBottom: 40
    },
    scoreTableIcon: {
        alignSelf: "flex-end",
        backgroundColor: colors.black,
        marginBottom: 100
    }
});
