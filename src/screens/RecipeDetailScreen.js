import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  UsersIcon,
  Square3Stack3DIcon,
} from "react-native-heroicons/solid";
import Loader from "../components/Loader";
import { mealData } from "../constents";

const RecipeDetailScreen = ({ navigation, route }) => {
  const item = route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState();

  let fetchRecipeData = async (id) => {
    setLoading(true);
    try {
      let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      let data = await res.json();
      if (data) {
        setRecipeData(data.meals[0]);
        setLoading(false);
      } else {
        throw new Error("Recipies fetching failed");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  let checkIngredients = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i < 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  useEffect(() => {
    fetchRecipeData(item.idMeal);
  }, []);

  console.log(recipeData);
  console.log(loading);

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar barStyle="light" />
      <View className="flex-row justify-center">
        <Image
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 40,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
          source={{ uri: item.strMealThumb }}
        />
      </View>
      {/* Buttons */}
      <View className="w-full flex-row justify-between items-center absolute pt-10">
        <TouchableOpacity
          className="p-2 ml-5 rounded-full bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 mr-5 rounded-full bg-white"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* Recipe data */}
      {loading ? (
        <Loader size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* Name and area */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {recipeData?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {recipeData?.strArea}
            </Text>
          </View>

          {/* misc */}
          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} color="#525252" strokeWidth={2.5} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} color="#525252" strokeWidth={2.5} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} color="#525252" strokeWidth={2.5} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Calories
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  color="#525252"
                  strokeWidth={2.5}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Calories
                </Text>
              </View>
            </View>
          </View>

          {/* ingredients */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {checkIngredients(recipeData).map((item, idx) => (
                <View key={idx} className="grid grid-cols-2 flex-row space-x-4">
                  <View
                    style={{ height: hp(1.5), width: hp(1.5) }}
                    className="bg-amber-300 rounded-full"
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-extrabold text-neutral-700"
                    >
                      {recipeData["strMeasure" + idx]}
                    </Text>
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="font-medium text-neutral-600"
                    >
                      {recipeData["strIngredient" + idx]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* instructions */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            {recipeData[0].strInstructions && (
              <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                {recipeData["strInstructions"]}
              </Text>
            )}
          </View>

          {/* youtube video */}
          {/* {recipeData.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-600"
              ></Text>
            </View>
          )} */}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailScreen;
