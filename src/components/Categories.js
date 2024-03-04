import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Animated, { FadeInDown } from "react-native-reanimated";
import Loader from "./Loader";

const Categories = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.length === 0 ? (
          <Loader size={"large"} className={"mt-20"} />
        ) : (
          categories.map((item, idx) => {
            const isActive = item.strCategory === activeCategory;
            let activeBtnColor = isActive ? "bg-amber-500" : "bg-black/10";
            return (
              <TouchableOpacity
                key={idx}
                className="flex items-center space-y-1"
                onPress={() => setActiveCategory(item.strCategory)}
              >
                <View className="rounded-full p-[6px]">
                  <Image
                    source={{ uri: item.strCategoryThumb }}
                    style={{
                      width: hp(6),
                      height: hp(6),
                      objectFit: "contain",
                    }}
                    className={`rounded-full object-contain ${activeBtnColor}`}
                  />
                  <Text
                    className="text-neutral-600"
                    style={{ fontSize: hp(1.6) }}
                  >
                    {item.strCategory}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
