// import icons from '../img/icons.svg'; //Parcel 1
import * as model from './model';
import recipeView from './views/RecipeView';
import SearchView from './views/SearchView';
import ResultsView from './views/ResultsView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

if(module.hot) module.hot.accept();

const showRecipeController = async function () {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;
		recipeView.renderSpinner();

		//1) Loading recipe
		await model.loadRecipe(id);

		// 2) Render recipe
		recipeView.render(model.state.recipe);
	} catch (err) {
		// console.error(err);
		recipeView.renderError();
	}
};

const searchController = async function () {
	try {
		ResultsView.renderSpinner();
		//1) Get Search query
		const query = SearchView.getQuery();
		if (!query) return;

		//2) Load search results;
		await model.loadSearchResults(query);

		//3) Render results
		ResultsView.render(model.state.search.results);
		console.log('state', model.state);
	} catch (e) {
		console.error(e);
	}
};

const init = function () {
	recipeView.addHandlerRender(showRecipeController);
	SearchView.addHandlerSearch(searchController);
};

init();
