const recipeImg = document.querySelector('.recipeImg')

const searchFoodRecipes = (meal) => {
    fetchFoodRecipes(meal).then(data => unpackFoodRecipes(data))
}

const fetchFoodRecipes = async (meal) => {
    try {
        let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
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
        const {idMeal} = mealInf

        return idMeal
    })
    recipeImg.src = meals[0].strMealThumb
    console.log(meals[0].strMealThumb, 'qwe')
}


searchFoodRecipes('meat')





