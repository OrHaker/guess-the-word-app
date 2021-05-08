import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Animated, FlatList } from 'react-native'

import { useDispatch, useSelector } from "react-redux";

import Screen from './../components/Screen';
import Button from './../components/Button';
import Loader from './../components/Loader';
import routes from "../navigation/routes"

import { retrieveAsyncStorageData } from '../utils/storage';

import colors from './../utils/colors';
import { removeAsyncStorageData } from './../utils/storage';
import { setWinnigDataAction } from '../store/actions/actions';


const ScoreTableScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const { winnigData } = useSelector(state => state);


    const _handleGoToIntro = () => { navigation.navigate(routes.INTRO_SCREEN); }


    const _clearTable = async () => {
        await removeAsyncStorageData("winnigData");
        dispatch(setWinnigDataAction([{ username: "", phone: "" }]));
    };

    const _renderScore = ({ item }) =>
        <AnimatedText style={styles.animatedText} >
            <Text style={styles.title}>{item.username ? `${item.username} hits ${item.highScore} phone ${item.phone}` : "Empty Table"}</Text>
        </AnimatedText>;



    return (
        <Screen>
            <Text style={styles.title}>High Scores Table!</Text>
            <FlatList
                data={winnigData}
                renderItem={_renderScore}
                keyExtractor={item => item.username + item.phone + Math.random()}
            />
            <Button onPress={_handleGoToIntro} title="Go To intro" />
            <Button title="CLEAR TABLE" onPress={_clearTable} />
        </Screen>
    )
}

export default ScoreTableScreen;

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light
    },
    centerText: {
        textAlign: "center",
        fontSize: 30,
        padding: 30,
        marginVertical: 10,
    },
    title: {
        textAlign: "center",
        fontWeight: "800",
        fontSize: 30
    }
});




const AnimatedText = ({ children }) => {
    const [height, setHeight] = useState(new Animated.Value(0));
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    useEffect(() => {
        height.setValue(0);
        opacity.setValue(0);
        Animated.sequence([
            Animated.timing(height, {
                toValue: 70,
                duration: 800,
                useNativeDriver: false
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: false
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={{ height: height, opacity: opacity }}
        >
            { children}
        </Animated.View>
    );
};
