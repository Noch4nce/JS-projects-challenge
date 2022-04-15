const recipeImgSelector = document.querySelector('.recipeImg')
const searchSelector = document.querySelector('.search')
const headerRecipesSelector = document.querySelector('.headerRecipes')
const recipesContainer = document.querySelector('.recipesContainer')

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
    recipesContainer.innerHTML = ''

    meals.forEach(mealInf =>  {
        const { strMealThumb, strMeal } = mealInf
        const recipeBlock = document.createElement('div')
        recipeBlock.className = 'recipeBlock'
        recipeBlock.innerHTML = `
            <img class="recipeImg" src=${strMealThumb} alt="recipe"> 
            <div>
                <h3>Name</h3>
                <img class="likeIcon" src="assets/like.png" alt="like">
            </div>
        `
        recipesContainer.append(recipeBlock)
        // const recipesMarkup =
        console.log(strMealThumb)
    })

    // recipeImgSelector.src = meals[0].strMealThumb
    console.log(meals[0].strMealThumb, 'qwe')
}

searchFoodRecipes()
