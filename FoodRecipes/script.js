const headerRecipesSelector = document.querySelector('.headerRecipes')
const recipesContainerSelector = document.querySelector('.recipesContainer')
const modalFoodRecipesContainerSelector = document.querySelector('.modalFoodRecipesContainer')
const favoriteContainerSelector = document.querySelector('.favoriteContainer')

let store = null
const favoriteRecipeNames = []
const obj = {
    name: [...favoriteRecipeNames],
    image: 'qwe'
}

const searchFoodRecipes = (mealName) => {
    if (mealName) {
        headerRecipesSelector.innerText = 'Recommended'
    }

    fetchFoodRecipes(mealName).then(data => unpackFoodRecipes(data))
}

const fetchFoodRecipes = async (meal) => {
    try {
        let resp = null

        if (meal) {
            resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        } else {
            resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        }

        let dataFoodRecipes = await resp.json()

        return dataFoodRecipes
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

const unpackFoodRecipes = (dataFoodRecipes) => {
    store = dataFoodRecipes
    const { meals } = store
    recipesContainerSelector.innerHTML = ''

    meals.forEach(mealInf =>  {
        const { strMealThumb, strMeal } = mealInf
        const recipeBlock = document.createElement('div')
        recipeBlock.className = 'recipeBlock'
        recipeBlock.innerHTML = `
            <img class="recipeImg" id="${strMeal}" src=${strMealThumb} alt="recipe" onclick="showModalRecipes(id)"
            <div>
                <h3>${strMeal}</h3>
                <button id="${strMeal}" onclick="setFavoriteRecipe(id)">
                    <img class="likeIcon" src="assets/like.png" alt="like">
                </button>
            </div>
        `
        recipesContainerSelector.append(recipeBlock)
    })
}

const showModalRecipes = (mealName) => {
    const { meals } = store
    modalFoodRecipesContainerSelector.innerHTML = ''

    meals.forEach(mealInf =>  {
        const { strMealThumb, strMeal, strInstructions } = mealInf

        if (strMeal === mealName) {
            const { setIngredients, setMeasureIngredients } = getIngredients(mealInf)
            const modalRecipeBlock = document.createElement('div')

            modalRecipeBlock.innerHTML = `
                <h3>${strMeal}</h3>
                <img class="recipeImg" src="${strMealThumb}" alt="like">
                <p>${strInstructions}</p>
                <h3>Ingredients:</h3>
                <ul class="listIngredients"></ul>
            `
            modalFoodRecipesContainerSelector.append(modalRecipeBlock)

            setIngredients.forEach((ingredient, i) => {
                const list = document.querySelector('.listIngredients')
                const li = document.createElement('li')

                if (mealInf[ingredient]) {
                    li.innerHTML = `${mealInf[ingredient]} - ${mealInf[setMeasureIngredients[i]]}`
                    list.append(li)
                }
            })
        }
    })

    modalFoodRecipesContainerSelector.style.display = 'flex'
}

const getIngredients = (meals) => {
    const keyMeals = Object.keys(meals)
    const setIngredients = []
    const setMeasureIngredients = []

    keyMeals.map((key) => {
        if (key.slice(0, -1) === 'strIngredient' || key.slice(0, -2) === 'strIngredient') {
            setIngredients.push(key)
        }

        if (key.slice(0, -1) === 'strMeasure' || key.slice(0, -2) === 'strMeasure') {
            setMeasureIngredients.push(key)
        }
    })

    return { setIngredients, setMeasureIngredients }
}

const setFavoriteRecipe = (mealName) => {
    const { meals } = store

    meals.forEach(mealInf =>  {
        const { strMealThumb, strMeal } = mealInf

        if (strMeal === mealName) {
            favoriteRecipeNames.push(mealName)
            const favBlock = document.createElement('div')
            favBlock.innerHTML = `<h4>${strMeal}</h4>
                <img src=${strMealThumb} alt="recipe">
            `

            favoriteContainerSelector.append(favBlock)
        }
    })
}

searchFoodRecipes()
