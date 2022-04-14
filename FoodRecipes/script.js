const recipeImgSelector = document.querySelector('.recipeImg')
const searchSelector = document.querySelector('.search')
const headerRecipesSelector = document.querySelector('.headerRecipes')

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
    const { meals } = dataFoodRecipes
    const asd = meals.map(mealInf =>  {
        // const mealId = mealInf.idMeal
        const { idMeal } = mealInf

        return idMeal
    })

    recipeImgSelector.src = meals[0].strMealThumb
    console.log(meals[0].strMealThumb, 'qwe')
}

searchFoodRecipes()
