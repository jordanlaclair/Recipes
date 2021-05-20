import React, { useState, useEffect } from "react";
import "../css/Header.css";

function Header({
	setQuery,
	recipes,
	setRecipes,
	setState,
	queryResults,
	setNoResultsFound,
}) {
	/* useEffect(() => {
		console.log("update state");
	}, [recipes]); */

	const diet = {
		balanced: "Balanced",
		highFiber: "High-Fiber",
		highProtein: "High-Protein",
		lowCarb: "Low-Carb",
		lowFat: "Low-Fat",
		lowSodium: "Low-Sodium",
	};

	const mealType = {
		breakfast: "breakfast",
		brunch: "brunch",
		lunchDinner: "lunch/dinner",
		snack: "snack",
		teatime: "teatime",
	};

	const cuisineType = {
		american: "american",
		asian: "asian",
		british: "british",
		caribbean: "caribbean",
		centralEurope: "central europe",
		chinese: "chinese",
		easternEurope: "eastern europe",
		french: "french",
		indian: "indian",
		italian: "italian",
		japanese: "japanese",
		kosher: "kosher",
		mediterranean: "mediterranean",
		mexican: "mexican",
		middleEastern: "middle eastern",
		nordic: "nordic",
		southAmerican: "south american",
		southEastAsian: "south east asian",
	};

	const dishType = {
		alcoholCockTail: "alcohol-cocktail",
		biscuitsAndCookies: "biscuits and cookies",
		bread: "bread",
		cereals: "cereals",
		condimentsAndSauces: "condiments and sauces",
		drinks: "drinks",
		dessert: "dessert",
		egg: "egg",
		mainCourse: "main course",
		omelet: "omelet",
		pancake: "pancake",
		preps: "preps",
		preserve: "preserve",
		salad: "salad",
		sandwiches: "sandwiches",
		soup: "soup",
		starter: "starter",
	};

	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState([]);

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const submitSearch = (e) => {
		e.preventDefault();

		setQuery(search);

		setSearch("");
	};

	const resetFilters = () => {
		console.log("queryResults in header component", queryResults);
		setFilters([]);
		setNoResultsFound(false);
		setRecipes(queryResults);
		//console.log(recipes);
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

	const filterMealType = (mealType) => {
		console.log(recipes);

		let filtered = (recipes || []).filter((recipe) => {
			if (
				recipe.recipe.mealType != undefined &&
				recipe.recipe.mealType[0] != undefined
			) {
				return recipe.recipe.mealType[0] === mealType;
			}
		});
		if (filtered.length === 0) {
			setNoResultsFound(true);
		}
		setRecipes(filtered);
		if (!filters.includes(mealType)) {
			const updatedFilters = [...filters, mealType];
			setFilters(updatedFilters);
		}
		console.log(filtered);
	};

	const filterCuisineType = (cuisine) => {
		console.log(recipes);

		let filtered = (recipes || []).filter((recipe) => {
			if (
				recipe.recipe.cuisineType != undefined &&
				recipe.recipe.cuisineType[0] != undefined
			) {
				return recipe.recipe.cuisineType[0] === cuisine;
			}
		});
		if (filtered.length === 0) {
			setNoResultsFound(true);
		}
		setRecipes(filtered);
		if (!filters.includes(cuisine)) {
			const updatedFilters = [...filters, cuisine];
			setFilters(updatedFilters);
		}
		console.log(filtered);
	};

	let filterDiet = (diet) => {
		console.log(recipes);

		let filtered = (recipes || []).filter((recipe) => {
			if (
				recipe.recipe.dietLabels[0] != undefined &&
				recipe.recipe.dietLabels != undefined
			) {
				return recipe.recipe.dietLabels[0] == diet;
			}
		});

		if (filtered.length === 0) {
			setNoResultsFound(true);
		}
		setRecipes(filtered);
		if (!filters.includes(diet)) {
			const updatedFilters = [...filters, diet];
			setFilters(updatedFilters);
		}
		console.log(filtered);
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
					id="resetFilter"
					class="btn btn-secondary background button-secondary-override"
				>
					Reset Filters
				</button>
				<div class="dropdown">
					<button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenu"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Sort
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenu">
						<button onClick={sortByIncreasingCalories} class="dropdown-item">
							Lowest Calories
						</button>
						<li className="dropdown-divider"></li>

						<button onClick={sortByDecreasingCalories} class="dropdown-item">
							Highest Calories
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
						className="dropdown-menu multi-level"
						role="menu"
						aria-labelledby="dropdownMenu"
					>
						<li className="dropdown-submenu">
							<div className="dropdown-item" tabindex="-1">
								Meal Type
							</div>
							<ul className="dropdown-menu">
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
							<div className="dropdown-item" tabindex="-1">
								Dish Type
							</div>
							<ul className="dropdown-menu">
								<li
									onClick={() => {
										filterMealType(dishType.alcoholCockTail);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Alcohol-cocktail
									</div>
								</li>

								<li
									onClick={() => {
										filterMealType(dishType.biscuitsAndCookies);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Biscuits and Cookies
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.bread);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Bread
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.cereals);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Cereals{" "}
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.condimentsAndSauces);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Condiments and Sauces{" "}
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.drinks);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Drinks
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.dessert);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Desserts
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.egg);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Egg
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.mainCourse);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Main Course
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.omelet);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Omelet
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.pancake);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Pancake
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.preps);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Preps
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.preserve);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Preserve
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.salad);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Salad
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.sandwiches);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Sandwiches
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.soup);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Soup
									</div>
								</li>
								<li
									onClick={() => {
										filterMealType(dishType.starter);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Starter
									</div>
								</li>
							</ul>
						</li>

						<li className="dropdown-divider"></li>

						<li className="dropdown-submenu">
							<div className="dropdown-item" tabindex="-1">
								Cuisine Type
							</div>
							<ul className="dropdown-menu">
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
								<li
									onClick={() => {
										filterCuisineType(cuisineType.nordic);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										Nordic
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.southAmerican);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										South American
									</div>
								</li>
								<li
									onClick={() => {
										filterCuisineType(cuisineType.southEastAsian);
									}}
									className="dropdown-item"
								>
									<div className="dropdown-item" tabindex="-1">
										South East Asian
									</div>
								</li>
							</ul>
						</li>

						<li className="dropdown-divider"></li>

						<li className="dropdown-submenu">
							<div className="dropdown-item" tabindex="-1">
								Diet
							</div>
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

export default Header;
