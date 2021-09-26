import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE, LOCAL_STORAGE_NAME } from './config';
import { AJAX } from './helpers';
import { API_KEY } from './.secretConfig';

export const state = {
  recipe: {},
  searchResults: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    activePage: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  const testRecipeUrl = `${API_URL}/${id}?key=${API_KEY}`;
  try {
    const data = await AJAX(testRecipeUrl);
    state.recipe = createRecipeObject(data);
    state.recipe.bookmarked = state.bookmarks.some(
      bk => bk.id === data.data.recipe.id
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        ([key, value]) =>
          key.toLowerCase().startsWith('ingredient') &&
          value.toLowerCase() !== ''
      )
      .map(([_, value]) => {
        a;
        const arr = value.split(',');
        if (arr.length !== 3)
          throw new Error(
            'Wrong ingredients Format, Please use the correct format!'
          );
        const [quantity, unit, description] = arr;
        return {
          quantity: quantity ? Number(quantity) : null,
          unit: unit,
          description: description,
        };
      }); //back to the array form
    const formattedRecipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: Number(newRecipe.servings),
      cooking_time: Number(newRecipe.cookingTime),
      ingredients: ingredients,
    };
    //console.log(formattedRecipe);
    const postRecipesUrl = `${API_URL}?key=${API_KEY}`;
    const data = await AJAX(postRecipesUrl, formattedRecipe);
    state.recipe = createRecipeObject(data);
    state.recipe.bookmarked = state.bookmarks.some(
      bk => bk.id === data.data.recipe.id
    );

    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  console.log('searching for ', query);
  const searchRecipesUrl = `${API_URL}/?search=${query}&key=${API_KEY}`;
  try {
    const data = await AJAX(searchRecipesUrl);
    state.searchResults.query = query;
    state.searchResults.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
        bookmarked: state.bookmarks.some(bk => bk.id === rec.id),
      };
    });
    state.searchResults.activePage = 1;
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

const persistBookmarks = function () {
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(state.bookmarks));
};
const clearBookmarksFromLocalStorage = function () {
  localStorage.removeItem(LOCAL_STORAGE_NAME);
  localStorage.clear();
};
const loadBookmarksFromLocalStorage = function () {
  const storedText = localStorage.getItem(LOCAL_STORAGE_NAME);
  if (!storedText) return;
  const storedBookmarks = JSON.parse(storedText);
  if (storedBookmarks) {
    state.bookmarks = storedBookmarks;
  }
};
export const addBookmark = function (recipe) {
  if (state.recipe.id === recipe.id) {
    state.recipe.bookmarked = true;
  }
  state.bookmarks.push(recipe);
  persistBookmarks();
};
export const removeBookmark = function (id) {
  if (state.recipe.id === id) {
    state.recipe.bookmarked = false;
  }
  state.bookmarks.splice(
    state.bookmarks.findIndex(bk => bk.id === id),
    1
  );
  persistBookmarks();
};

const init = function () {
  loadBookmarksFromLocalStorage();
};
init();
