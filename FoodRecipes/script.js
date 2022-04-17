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
    let modalRecipeBlock = null
    let ingredients = []

    meals.forEach(mealInf =>  {
        const { strMealThumb, strMeal } = mealInf
        ingredients = getIngredients(mealInf)

        if (strMeal === mealName) {
                modalRecipeBlock = document.createElement('div')
                modalRecipeBlock.innerHTML = `
                <h3>${strMeal}</h3>
                <img class="recipeImg" src="${strMealThumb}" alt="like">
                <ul class="listIngredients"></ul>
            `
            modalFoodRecipesContainerSelector.append(modalRecipeBlock)
            ingredients.forEach(ingredient => {
                const list = document.querySelector('.listIngredients')
                const li = document.createElement('li')
                li.innerHTML = mealInf[ingredient]

                list.append(li)
            })
        }
    })

    modalFoodRecipesContainerSelector.style.display = 'flex'
}

const getIngredients = (meals) => {
    const keyMeals = Object.keys(meals)
    const setIngredients = []

    keyMeals.map((key) => {
        if (key.slice(0, -1) === 'strIngredient') {
            setIngredients.push(key)
        }
    })

    return setIngredients
}

searchFoodRecipes()
