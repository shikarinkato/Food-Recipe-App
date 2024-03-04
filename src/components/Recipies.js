import MasonryList from "@react-native-seoul/masonry-list";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { mealData } from "../constents";

import Animated, { FadeInDown } from "react-native-reanimated";
import Loader from "./Loader";

const Recipies = ({ recipies, navigation }) => {
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3), width: wp(90) }}
        className=" font-semibold text-neutral-600"
      >
        Recipies
      </Text>

      <View style={{ flex: 1 }}>
        {recipies.length === 0 || recipies === null ? (
          <Loader size="large" className={"mt-20"} />
        ) : (
          <MasonryList
            data={recipies}
            keyExtractor={(item) => item.idMeal.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, idx }) => (
              <RecipeCard navigation={navigation} item={item} index={idx} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

export default Recipies;

const RecipeCard = ({ item, index, navigation }) => {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      style={{ flex: 1 }}
      key={index}
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => navigation.push("RecipeDetail", { ...item })}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
            objectFit: "cover",
          }}
          className="bg-black/5"
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className=" font-semibold text-neutral-600 ml-2"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "...."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
