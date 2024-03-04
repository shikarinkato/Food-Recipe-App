import { View, Text, StatusBar, Image } from "react-native";
import React, { useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const WelcomeScreen = ({ navigation }) => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => {
      ring1padding.value = withSpring(ring1padding.value + hp(5));
    }, 100);
    setTimeout(() => {
      ring2padding.value = withSpring(ring2padding.value + hp(5.5));
    }, 300);
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);
  return (
    <View className="flex-1 justify-center items-center space-y-10 h-screen bg-amber-500">
      <StatusBar barStyle="light" backgroundColor="gray" />
      <Animated.View
        className="bg-white/20 rounded-full "
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full "
          style={{ padding: ring1padding }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            height={hp(20)}
            width={hp(20)}
            style={{ height: hp(20), width: hp(20) }}
          />
        </Animated.View>
      </Animated.View>
      <View className="flex items-center gap-y-3">
        <Text
          className={`text-white font-bold tracking-widest `}
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="text-white font-medium tracking-widest "
          style={{ fontSize: hp(2) }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
