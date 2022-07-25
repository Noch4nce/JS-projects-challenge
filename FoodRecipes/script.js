const bodySelector = document.querySelector('.body')
const mainContainerSelector = document.querySelector('.mainContainer')
const headerRecipesSelector = document.querySelector('.header_recipes')
const recipesContainerSelector = document.querySelector('.recipesContainer')
const modalFoodRecipesContainerSelector = document.querySelector('.modalFoodRecipesContainer')
const favoriteContainerSelector = document.querySelector('.favoriteContainer')
const favoriteMainTitleSelector = document.querySelector('.favorite_main-title')

let store = null
const dataFavoriteFoodRecipes = []

const initFoodRecipes = () => {
    const dataStorageRecipes = localStorage.getItem('favRecipe')
    searchFoodRecipes()

    if (dataStorageRecipes) {
        const localFavoriteFoodRecipes = JSON.parse(dataStorageRecipes)

        storageFavoriteRecipeUI(localFavoriteFoodRecipes)
    }

    if (dataFavoriteFoodRecipes.length === 0) {
        favoriteMainTitleSelector.innerHTML = ''
    }
}

const searchFoodRecipes = (mealName) => {
    if (mealName) {
        headerRecipesSelector.innerText = ''
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
        const recipe_block = document.createElement('div')
        recipe_block.className = 'recipe_block'
        recipe_block.innerHTML = `
            <img class="recipe_img" id="${strMeal}" src=${strMealThumb} alt="recipe" onclick="showModalRecipes(id)">
            <div class="recipe_name_block">
                <h3 class="repName">${strMeal}</h3>
                <button name="${strMeal}" onclick="setFavoriteRecipe(name)">
                    <img class="likeIcon" src="assets/icons8-like-49.png" alt="like">
                </button>
            </div>
        `
        recipesContainerSelector.append(recipe_block)
    })
}

const showModalRecipes = (mealName) => {
    const { meals } = store
    modalFoodRecipesContainerSelector.innerHTML = ''
    bodySelector.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
    mainContainerSelector.style.display = 'none'

    meals.forEach(mealInf =>  {
        const { strMealThumb, strMeal, strInstructions } = mealInf

        if (strMeal === mealName) {
            const { setIngredients, setMeasureIngredients } = getIngredients(mealInf)
            const modalRecipeBlock = document.createElement('div')
            modalRecipeBlock.className = 'recipe_modal-block'

            modalRecipeBlock.innerHTML = `
                <img class="recipe_modal-close" src="./assets/close.png" onclick="closeModalRecipes()" alt="close">
                <h2 class="recipe_modal-title">${strMeal}</h2>
                <img class="recipe_modal-img" src="${strMealThumb}" alt="modalRecipe">
                <p>${strInstructions}</p>
                <h3 class="ingredients_title">Ingredients:</h3>
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

    modalFoodRecipesContainerSelector.style.display = 'block'
}

const closeModalRecipes = () => {
    modalFoodRecipesContainerSelector.style.display = 'none'
    bodySelector.style.backgroundColor = '#edede9'
    mainContainerSelector.style.display = 'flex'
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
    const likeIcon = favBtn.firstElementChild
    favBtn.disabled = true
    likeIcon.src = './assets/likeFilled.png'

    meals.forEach(mealInf =>  {
        const { idMeal, strMealThumb, strMeal, strInstructions } = mealInf

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
                id: idMeal,
                name: strMeal,
                image: strMealThumb,
                instruction: strInstructions,
                ingredients: ingredientsValue,
                measure: measureValue
            })

            const favBlock = document.createElement('div')
            favBlock.className = 'favBlock'
            favBlock.innerHTML = `
                <div class="favorite_content">
                     <img class="favorite_image" id="${strMeal}" src="${strMealThumb}" onclick="showModalRecipes(id)" alt="recipe">
                     
                     <img id="${idMeal}" class="favBtn favorite_delete-img" src="./assets/del.png">
                </div>
                <h4 class="favorite_title">${strMeal}</h4>
            `
            favoriteContainerSelector.append(favBlock)
            const favBtnSelector = document.querySelectorAll('.favBtn')

            favBtnSelector.forEach((favBtn) => {
                favBtn.addEventListener('click', (event) => deleteFavBlock(event))
            })

            localStorage.setItem('favRecipe', JSON.stringify(dataFavoriteFoodRecipes))
        }
    })

    if (dataFavoriteFoodRecipes.length !== 0) {
        favoriteMainTitleSelector.innerHTML = 'Favorite recipes'
    }
}

const storageFavoriteRecipeUI = (favoriteRecipes) => {
    favoriteRecipes.forEach(favoriteRecipe => {
        const { id, name, image } = favoriteRecipe
        const favBlock = document.createElement('div')
        favBlock.className = 'favBlock'
        favBlock.innerHTML = `
            <div class="favorite_content">
                <img class="favorite_image" id="${name}" src="${image}" onclick="showModalFavoriteRecipes(id)" alt="recipe">
                
                <img id="${id}" class="favBtn favorite_delete-img" src="./assets/del.png">
            </div>
            <h4 class="favorite_title">${name}</h4>
        `
        favoriteContainerSelector.append(favBlock)
        dataFavoriteFoodRecipes.push(favoriteRecipe)

        const favBtnSelector = document.querySelectorAll('.favBtn')

        favBtnSelector.forEach((favBtn) => {
            favBtn.addEventListener('click', (event) => deleteFavBlock(event))
        })
    })
}

const showModalFavoriteRecipes = (currentName) => {
    modalFoodRecipesContainerSelector.innerHTML = ''
    bodySelector.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
    mainContainerSelector.style.display = 'none'

    dataFavoriteFoodRecipes.forEach(mealInf =>  {
        const { name, image, instruction, ingredients, measure } = mealInf

        if (name === currentName) {
            const modalRecipeBlock = document.createElement('div')
            modalRecipeBlock.className = 'recipe_modal-block'

            modalRecipeBlock.innerHTML = `
                <img class="recipe_modal-close" src="./assets/close.png" onclick="closeModalRecipes()" alt="close">
                <h2 class="recipe_modal-title">${name}</h2>
                <img class="recipe_modal-img" src="${image}" alt="like">
                <p>${instruction}</p>
                <h3 class="ingredients_title">Ingredients:</h3>
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

    modalFoodRecipesContainerSelector.style.display = 'block'
}

const deleteFavBlock = (event) => {
    const favBlockParentNode = event.target.parentNode.parentNode
    const currentFavBlockId = event.target.id

    dataFavoriteFoodRecipes.forEach((favRec, index) => {
        const { id } = favRec

        if (id === currentFavBlockId) {
            dataFavoriteFoodRecipes.splice(index, 1)

            localStorage.setItem('favRecipe', JSON.stringify(dataFavoriteFoodRecipes))
        }
    })

    favBlockParentNode.remove()

    if (dataFavoriteFoodRecipes.length === 0) {
        favoriteMainTitleSelector.innerHTML = ''
    }
}

initFoodRecipes()
