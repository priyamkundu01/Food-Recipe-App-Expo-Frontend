import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MealAPI } from "../../services/mealApi";

const HomeScreen = () => {
  /* async function testSearchMeal() {
    const meals = await MealAPI.filterByIngredient("chicken_breast");
    console.log(meals);
  }
  testSearchMeal(); */

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const [apiCategories, randomMeals, featuredMeal] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeals(12),
        MealAPI.getRandomMeal,
      ]);

      const transformedCategories = apiCategories.map((cat, index) => ({
        id: index + 1,
        name: cat.strCategory,
        description: cat.strCategoryDescription,
        image: cat.strCategoryThumb,
      }));

      setSelectedCategory(transformedCategories);

      const transformedMeals = randomMeals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal) => meal != null);

      setRecipes(transformedMeals);

      const transformedFeatured = MealAPI.transformMealData(featuredMeal);

      setFeaturedRecipe(transformedFeatured);
    } catch (error) {
      console.log("Error loading the data", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category) => {
    try {
      const meals = await MealAPI.filterByCategory(category);
      const transformedMeals = meals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal) => (meal = !null));
      setRecipes(transformedMeals);
    } catch (error) {
      console.error("Error loading category data", error);
      setRecipes([]);
    }
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await loadCategoryData(category);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
