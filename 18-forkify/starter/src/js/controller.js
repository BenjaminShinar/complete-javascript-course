import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//console.log('Test');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; //guard clause
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
//showRecipe('5ed6604591c37cdc054bc886');
//showRecipe('5ed6604691c37cdc054bd0c0');

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
