import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import Recipies from "../components/Recipies";
import Loader from "../components/Loader";

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("Beef");

  const [categories, setCategories] = useState([]);
  const [recipies, setRecipies] = useState([]);

  let fetchCategories = async () => {
    try {
      let res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      let data = await res.json();
      if (data) {
        setCategories(data.categories);
      } else {
        throw new Error("Categories fetching failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let fetchRecipies = async (activeCategory) => {
    try {
      let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`
      );
      let data = await res.json();
      // console.log(data);
      if (data) {
        setRecipies(data.meals);
      } else {
        throw new Error("Recipies fetching failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchRecipies(activeCategory);
  }, [activeCategory]);

  return (
    <View className="flex justify-center items-center h-screen w-screen">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View
          className="mx-4 flex-row justify-between items-center mb-2"
          style={{ width: wp(95) }}
        >
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon className="mr-4" size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(2) }} className="text-neutral-600">
            Hello Raman !
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            Make your own food,
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>.
          </Text>
        </View>
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe here"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              style={{ height: hp(2.7) }}
              strokeWidth={3}
              color="gray"
            />
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}

          {/* Recipies */}
          {recipies.length > 0 && recipies !== null && (
            <Recipies navigation={navigation} recipies={recipies} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
