const recipeImgSelector = document.querySelector('.recipeImg')
const searchSelector = document.querySelector('.search')
const headerRecipesSelector = document.querySelector('.headerRecipes')
const recipesContainerSelector = document.querySelector('.recipesContainer')
const modalFoodRecipesContainerSelector = document.querySelector('.modalFoodRecipesContainer')
const modalRecipeNameSelector = document.querySelector('.modalRecipeName')

let store = null

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
                <img class="likeIcon" src="assets/like.png" alt="like">
            </div>
        `
        recipesContainerSelector.append(recipeBlock)
        console.log(strMeal)
    })
}

const showModalRecipes = (mealName) => {
    const { meals } = store
    modalFoodRecipesContainerSelector.innerHTML = ''

    meals.forEach(mealInf =>  {
        const { strMealThumb, strMeal } = mealInf
        console.log(mealInf.strIngredient1, "strMeal")
        const ingredients = getIngredients(mealInf)

        if (strMeal === mealName) {
            const modalRecipeBlock = document.createElement('div')
                modalRecipeBlock.innerHTML = `
                <h3>${strMeal}</h3>
                <img class="recipeImg" src="${strMealThumb}" alt="like">
            `
            modalFoodRecipesContainerSelector.append(modalRecipeBlock)
        }
    })

    modalFoodRecipesContainerSelector.style.display = 'flex'
    // modalRecipeNameSelector.innerText = meals[0].strMeal

    console.log(mealName, 'qwe')
}

const getIngredients = (meals) => {
    const keyMeals = Object.keys(meals)
    const arr = []

    keyMeals.map((key) => {
        if (key.slice(0, -1) === 'strIngredient') {
            arr.push(key)
        }
    })

    console.log(arr, "ASD")
}

searchFoodRecipes()
