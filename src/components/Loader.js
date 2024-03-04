import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loader = ({ size, className }) => {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator size={size} className={className} />
    </View>
  );
};

export default Loader;
