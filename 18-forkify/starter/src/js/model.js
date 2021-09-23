import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const testRecipeUrl = `${API_URL}/${id}`;
  try {
    const data = await getJSON(testRecipeUrl);
    const { recipe: recipeData } = data.data;
    state.recipe = {
      id: recipeData.id,
      title: recipeData.title,
      publisher: recipeData.publisher,
      sourceUrl: recipeData.source_url,
      image: recipeData.image_url,
      servings: recipeData.servings,
      cookingTime: recipeData.cooking_time,
      ingredients: recipeData.ingredients,
    };
  } catch (err) {
    console.error(err);
  }
};
