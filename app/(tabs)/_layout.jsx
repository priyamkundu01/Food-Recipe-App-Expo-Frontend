import React from "react";
import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../../constants/colors";

const TabLayout = () => {
  const { isSignedIn } = useAuth();

  if(!isSignedIn) return <Redirect href={'/(auth)/sign-in'}/>

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 15,
          paddingTop: 8,
          height: 95
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontStyle: "600"
        }
      }}
    >
      <Tabs.Screen
        // name should same as the file name
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({color, size}) => <Ionicons name="restaurant" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({color, size}) => <Ionicons name="search" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favourites",
          tabBarIcon: ({color, size}) => <Ionicons name="heart" size={size} color={color} />
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
