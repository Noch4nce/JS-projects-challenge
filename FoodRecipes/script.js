const headerRecipesSelector = document.querySelector('.headerRecipes')
const recipesContainerSelector = document.querySelector('.recipesContainer')
const modalFoodRecipesContainerSelector = document.querySelector('.modalFoodRecipesContainer')
const favoriteContainerSelector = document.querySelector('.favoriteContainer')

let store = null
const dataFavoriteFoodRecipes = []

const initFoodRecipes = () => {
    const dataStorageRecipes = localStorage.getItem('favRecipe')
    searchFoodRecipes()

    if (dataStorageRecipes) {
        const localFavoriteFoodRecipes = JSON.parse(dataStorageRecipes)

        storageFavoriteRecipeUI(localFavoriteFoodRecipes)
    }
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
                <h3 class="repName">${strMeal}</h3>
                <button name="${strMeal}" onclick="setFavoriteRecipe(name)">
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
                <img class="close" src="./assets/close.png" onclick="closeModalRecipes()" alt="close">
                <h3>${strMeal}</h3>
                <img class="recipeImg" src="${strMealThumb}" alt="modalRecipe">
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

const closeModalRecipes = () => {
    modalFoodRecipesContainerSelector.style.display = 'none'
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
    const favBtn = document.querySelector(`button[name='${mealName}']`)
    favBtn.disabled = true
    favBtn.style.background = 'red'

    meals.forEach(mealInf =>  {
        const { strMealThumb, strMeal, strInstructions } = mealInf

        if (strMeal === mealName) {
            const { setIngredients, setMeasureIngredients } = getIngredients(mealInf)
            const ingredientsValue = []
            const measureValue = []

            setIngredients.forEach((ingredient, i) => {
                if (mealInf[ingredient]) {
                    ingredientsValue.push(mealInf[ingredient])
                    measureValue.push(mealInf[setMeasureIngredients[i]])
                }
            })

            dataFavoriteFoodRecipes.push({
                name: strMeal,
                image: strMealThumb,
                instruction: strInstructions,
                ingredients: ingredientsValue,
                measure: measureValue
            })

            const favBlock = document.createElement('div')
            favBlock.innerHTML = `<h4>${strMeal}</h4>
                <img id="${strMeal}" src="${strMealThumb}" onclick="showModalRecipes(id)" alt="recipe">
            `
            favoriteContainerSelector.append(favBlock)

            localStorage.setItem('favRecipe', JSON.stringify(dataFavoriteFoodRecipes))
        }
    })
}

const storageFavoriteRecipeUI = (favoriteRecipes) => {
    favoriteRecipes.forEach(favoriteRecipe => {
        const { name, image } = favoriteRecipe
        const favBlock = document.createElement('div')
        favBlock.innerHTML = `<h4>${name}</h4>
            <img id="${name}" src="${image}" alt="recipe" onclick="showModalFavoriteRecipes(id)">
        `

        favoriteContainerSelector.append(favBlock)
        dataFavoriteFoodRecipes.push(favoriteRecipe)
    })
}

const showModalFavoriteRecipes = (currentName) => {
    modalFoodRecipesContainerSelector.innerHTML = ''

    dataFavoriteFoodRecipes.forEach(mealInf =>  {
        const { name, image, instruction, ingredients, measure } = mealInf

        if (name === currentName) {
            const modalRecipeBlock = document.createElement('div')

            modalRecipeBlock.innerHTML = `
                <img class="close" src="./assets/close.png" onclick="closeModalRecipes()" alt="close">
                <h3>${name}</h3>
                <img class="recipeImg" src="${image}" alt="like">
                <p>${instruction}</p>
                <h3>Ingredients:</h3>
                <ul class="listIngredients"></ul>
            `
            modalFoodRecipesContainerSelector.append(modalRecipeBlock)

            ingredients.forEach((ingredient, i) => {
                const list = document.querySelector('.listIngredients')
                const li = document.createElement('li')

                li.innerHTML = `${ingredient} - ${measure[i]}`
                list.append(li)
            })
        }
    })

    modalFoodRecipesContainerSelector.style.display = 'flex'
}

initFoodRecipes()
