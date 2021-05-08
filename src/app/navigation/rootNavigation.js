import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import GameOverScreen from "../screens/GameOverScreen.js";
import GameScreen from './../screens/GameScreen';
import IntroScreen from './../screens/IntroScreen';
import ScoreTableScreen from "./../screens/ScoreTableScreen"

const Stack = createStackNavigator();


const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, }}>
    <Stack.Screen name={routes.INTRO_SCREEN} component={IntroScreen} />
    <Stack.Screen name={routes.GAME_SCREEN} component={GameScreen} />
    <Stack.Screen name={routes.GAME_OVER_SCREEN} component={GameOverScreen} />
    <Stack.Screen name={routes.SCORE_TABLE} component={ScoreTableScreen} />
  </Stack.Navigator>
);

export default RootNavigator;
