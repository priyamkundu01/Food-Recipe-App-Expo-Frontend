import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const TabLayout = () => {
  const { isSignedIn } = useAuth();

  if(!isSignedIn) return <Redirect href={'/(auth)/sign-in'}/>

  return (
    <Stack/>
  );
};

export default TabLayout;
