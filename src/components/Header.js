import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	diet,
	mealType,
	cuisineType,
	dishType,
} from "../Constants/ApiConstants";
import "../css/Header.css";

function Header({
	setQuery,
	recipes,
	setRecipes,
	setState,
	querySearch,
	filters,
	setFilters,
	queryResults,
	setNoResultsFound,
}) {
	useEffect(() => {
		//console.log("filters using", filters);
		//console.log(filters.length);
		for (const key in filters) {
			//console.log(filters[key]);
		}
	}, [filters]);

	const [search, setSearch] = useState("");

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const submitSearch = (e) => {
		e.preventDefault();

		setQuery(search);

		setSearch("");
	};

	const resetFilters = () => {
		//console.log("queryResults in header component", queryResults);
		setFilters([]);
		setNoResultsFound(false);
		setRecipes(queryResults);
		//console.log(recipes);
	};

	function getKeyByValue(object, value) {
		return Object.keys(object).find((key) => object[key] === value);
	}

	let removeFilter = (currentFilter) => {
		//console.log("queryResults", queryResults);
		const newFilter = filters.filter((filter) => filter !== currentFilter);
		setFilters(newFilter);
		let newArr = [...filters];
		const index = filters.indexOf(currentFilter);
		if (index > -1) {
			newArr.splice(index, 1);
		}

		if (filters.length === 1) {
			setNoResultsFound(false);
			setRecipes(querySearch);
		} else {
			let filtered;
			newArr.forEach((filter) => {
				filtered = (queryResults || []).filter((recipe) => {
					let key = getKeyByValue(recipe.recipe, filter);
					//console.log(recipe.recipe);
					if (key === undefined) {
						//console.log("here");
						key = Object.keys(recipe.recipe).find(
							(key) => recipe.recipe[key][0] === filter
						);
					}

					//console.log(recipe.recipe);
					//console.log(recipe.recipe.mealType);
					//console.log(recipe.recipe[key][0]);
					//console.log(key);
					if (
						recipe.recipe[key] !== undefined &&
						recipe.recipe[key][0] !== undefined
					) {
						return recipe.recipe[key][0] === filter;
					}
				});
			});

			if (filtered.length === 0) {
				setNoResultsFound(true);
			} else {
				setNoResultsFound(false);
				//move this line below outside?
				setRecipes(filtered);
			}

			//console.log("filtered", filtered);
		}
	};

	const sortByIncreasingCalories = () => {
		setState(["1"]);
		let sorted = recipes.sort(function (a, b) {
			return a.recipe.calories - b.recipe.calories;
		});
		setRecipes(sorted);
		//console.log(sorted);
	};

	const sortByDecreasingCalories = () => {
		setState(["2"]);
		let sorted = recipes.sort(function (a, b) {
			return b.recipe.calories - a.recipe.calories;
		});

		setRecipes(sorted);
		//console.log(sorted);
	};

	const sortByIncreasingTime = () => {
		setState(["3"]);
		let newArr = [...recipes];
		let filtered = newArr.filter((recipe) => {
			return recipe.recipe.totalTime !== 0;
		});
		let sorted = filtered.sort(function (a, b) {
			return a.recipe.totalTime - b.recipe.totalTime;
		});
		setRecipes(sorted);
		//console.log(sorted);
	};

	const sortByDecreasingTime = () => {
		setState(["4"]);
		let newArr = [...recipes];
		let filtered = newArr.filter((recipe) => {
			return recipe.recipe.totalTime !== 0;
		});
		let sorted = filtered.sort(function (a, b) {
			return b.recipe.totalTime - a.recipe.totalTime;
		});
		setRecipes(sorted);
		//console.log(sorted);
	};

	const filterMealType = (mealType) => {
		//console.log(recipes);

		let filtered = recipes.filter(
			(recipe) =>
				recipe.recipe.mealType !== undefined &&
				recipe.recipe.mealType[0] !== undefined &&
				recipe.recipe.mealType.length !== 0 &&
				recipe.recipe.mealType[0] === mealType
		);

		//console.log("filtereddddd", filtered);
		if (filtered.length === 0) {
			setNoResultsFound(true);
		}
		setRecipes(filtered);
		if (!filters.includes(mealType)) {
			const updatedFilters = [...filters, mealType];
			setFilters(updatedFilters);
		}
		//console.log("new filter amount", filtered);
	};

	const filterDishType = (dishType) => {
		//console.log(recipes);

		let filtered = recipes.filter(
			(recipe) =>
				recipe.recipe.dishType !== undefined &&
				recipe.recipe.dishType[0] !== undefined &&
				recipe.recipe.dishType.length !== 0 &&
				recipe.recipe.dishType[0] === dishType
		);

		if (filtered.length === 0) {
			setNoResultsFound(true);
		}
		setRecipes(filtered);
		if (!filters.includes(dishType)) {
			const updatedFilters = [...filters, dishType];
			setFilters(updatedFilters);
		}
		//console.log("new filter amount", filtered);
	};

	const filterCuisineType = (cuisine) => {
		//console.log(recipes);

		let filtered = recipes.filter(
			(recipe) =>
				recipe.recipe.cuisineType !== undefined &&
				recipe.recipe.cuisineType[0] !== undefined &&
				recipe.recipe.cuisineType.length !== 0 &&
				recipe.recipe.cuisineType[0] === cuisine
		);

		if (filtered.length === 0) {
			setNoResultsFound(true);
		}
		setRecipes(filtered);
		if (!filters.includes(cuisine)) {
			const updatedFilters = [...filters, cuisine];
			setFilters(updatedFilters);
		}
		//console.log("new filter amount", filtered);
	};

	const filterDiet = (diet) => {
		//on click for each filter, store previous filter
		//console.log(recipes);

		let filtered = recipes.filter(
			(recipe) =>
				recipe.recipe.dietLabels !== undefined &&
				recipe.recipe.dietLabels[0] !== undefined &&
				recipe.recipe.dietLabels.length !== 0 &&
				recipe.recipe.dietLabels[0] === diet
		);

		if (filtered.length === 0) {
			setNoResultsFound(true);
		}
		setRecipes(filtered);
		if (!filters.includes(diet)) {
			const updatedFilters = [...filters, diet];
			setFilters(updatedFilters);
		}
		//console.log("new filter amount", filtered);
	};

	return (
		<div className="header_wrapper">
			<header
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				className="header"
			>
				RecipeMe
			</header>
			<div class="form__wrapper">
				<form onSubmit={submitSearch} className="search-form">
					<input
						type="text"
						className="search-bar"
						value={search}
						onChange={updateSearch}
						placeholder="Search for a recipe!"
					/>
					<button className="search-button" type="submit">
						Search
					</button>
				</form>
			</div>
			<div className="menu">
				<button
					type="button"
					onClick={() => {
						resetFilters();
					}}
					id="dropdownMenu"
					className="btn btn-secondary button-secondary-override"
				>
					Reset Filters
				</button>
				<div className="dropdown">
					<button
						className="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenu"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Sort
					</button>

					<div className="dropdown-menu" aria-labelledby="dropdownMenu">
						<button onClick={sortByIncreasingCalories} class="dropdown-item">
							Lowest Calories
						</button>
						<li className="dropdown-divider"></li>

						<button onClick={sortByDecreasingCalories} class="dropdown-item">
							Highest Calories
						</button>
						<li className="dropdown-divider"></li>

						<button onClick={sortByIncreasingTime} class="dropdown-item">
							Shortest Time
						</button>
						<li className="dropdown-divider"></li>

						<button onClick={sortByDecreasingTime} class="dropdown-item">
							Longest Time
						</button>
					</div>
				</div>

				<div className="dropdown">
					<button
						className="btn btn-secondary dropdown-toggle "
						type="button"
						id="dropdownMenu"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Filter
					</button>
					<ul
						className="dropdown-menu multi-level "
						role="menu"
						aria-labelledby="dropdownMenu"
					>
						<li className="dropdown-submenu">
							<a className="dropdown-item dropdown-toggle test" tabindex="-1">
								Meal Type
							</a>

							<ul className="dropdown-menu" id="meal-type">
								<li
									onClick={() => {
										filterMealType(mealType.breakfast);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Breakfast
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(mealType.brunch);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Brunch
									</div>
								</li>

								<li
									onClick={() => {
										filterMealType(mealType.lunchDinner);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Lunch/Dinner
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(mealType.snack);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Snack
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(mealType.teatime);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Tea Time
									</div>
								</li>
							</ul>
						</li>

						<li className="dropdown-divider"></li>

						<li className="dropdown-submenu">
							<a className="dropdown-item dropdown-toggle test " tabindex="-1">
								Dish Type
							</a>
							<ul className="dropdown-menu">
								<li
									onClick={() => {
										filterDishType(dishType.alcoholCockTail);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Alcohol-cocktail
									</div>
								</li>

								<li
									onClick={() => {
										filterDishType(dishType.biscuitsAndCookies);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Biscuits and Cookies
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.bread);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Bread
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.cereals);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Cereals{" "}
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.condimentsAndSauces);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Condiments and Sauces{" "}
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.drinks);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Drinks
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.dessert);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Desserts
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.egg);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Egg
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.mainCourse);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Main Course
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.omelet);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Omelet
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.pancake);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Pancake
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.preps);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Preps
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.preserve);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Preserve
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.salad);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Salad
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.sandwiches);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Sandwiches
									</div>
								</li>
								<li
									onClick={() => {
										filterDishType(dishType.soup);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Soup
									</div>
								</li>
							</ul>
						</li>

						<li className="dropdown-divider"></li>

						<li className="dropdown-submenu">
							<a className="dropdown-item dropdown-toggle test" tabindex="-1">
								Cuisine Type
							</a>
							<ul className="dropdown-menu">
								<li
									onClick={() => {
										filterCuisineType(cuisineType.american);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										American
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.asian);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Asian
									</div>
								</li>

								<li
									onClick={() => {
										filterCuisineType(cuisineType.british);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										British
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.caribbean);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Caribbean
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.centralEurope);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Central Europe
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.chinese);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Chinese
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.easternEurope);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Eastern Europe
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.french);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										French
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.indian);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Indian
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.italian);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Italian
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.japanese);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Japanese
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.kosher);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Kosher
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.mediterranean);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Mediterranean
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.mexican);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Mexican
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.middleEastern);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Middle Eastern
									</div>
								</li>
							</ul>
						</li>

						<li className="dropdown-divider"></li>

						<li className="dropdown-submenu">
							<a className="dropdown-item dropdown-toggle test" tabindex="-1">
								Diet
							</a>
							<ul className="dropdown-menu">
								<li
									onClick={() => {
										filterDiet(diet.lowCarb);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Low-Carb
									</div>
								</li>
								<li
									onClick={() => {
										filterDiet(diet.lowFat);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Low-Fat
									</div>
								</li>
								<li
									onClick={() => {
										filterDiet(diet.lowSodium);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Low Sodium
									</div>
								</li>
								<li
									onClick={() => {
										filterDiet(diet.balanced);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Balanced
									</div>
								</li>
								<li
									onClick={() => {
										filterDiet(diet.highFiber);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										High Fiber
									</div>
								</li>
								<li
									onClick={() => {
										filterDiet(diet.highProtein);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										High Protein
									</div>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div class="dropdown">
					<button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenu"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Current Filters
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenu">
						{filters.length === 0 ? (
							<button
								style={{ pointerEvents: "none" }}
								onClick={sortByIncreasingCalories}
								class="dropdown-item"
							>
								None
							</button>
						) : (
							filters.map((filter) => (
								<div className="dropdown-item-spread">
									<button
										style={{ pointerEvents: "none" }}
										onClick={sortByDecreasingCalories}
										class="dropdown-item"
									>
										{filter}
									</button>
									<button
										style={{ pointerEvents: "auto", cursor: "pointer" }}
										type="button"
										class="btn"
										onClick={() => {
											removeFilter(filter);
										}}
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

Header.propTypes = {
	query: PropTypes.string,
	setQuery: PropTypes.string,
	recipes: PropTypes.array,
	setRecipes: PropTypes.array,
	setState: PropTypes.array,
	queryResults: PropTypes.array,
	setNoResultsFound: PropTypes.bool,
};

export default Header;
