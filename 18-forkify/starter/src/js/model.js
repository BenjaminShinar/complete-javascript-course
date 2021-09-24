import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  searchResults: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    activePage: 1,
  },
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
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  console.log('searching for ', query);
  const searchRecipesUrl = `${API_URL}/?search=${query}`;
  try {
    const data = await getJSON(searchRecipesUrl);
    state.searchResults.query = query;
    state.searchResults.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getSearchResultsPage = function (
  page = state.searchResults.activePage
) {
  state.searchResults.activePage = page;
  const start = (page - 1) * state.searchResults.resultsPerPage;
  const end = page * state.searchResults.resultsPerPage;
  return state.searchResults.results.slice(start, end);
};
export const updateServings = function (newServings = state.recipe.servings) {
  const factor = newServings / state.recipe.servings;
  if (factor === 1) return;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity *= factor;
  });
  state.recipe.servings = newServings;
};
