import { Injectable } from '@angular/core'

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService} from '../shopping-list/shopping-list.service'

@Injectable()
export class RecipeService {
  private recipes : Recipe[] = [
  new Recipe("Tasty Schnitzel", "A tasty Schnitzel - just awesome!",
    "https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d",
    [
      new Ingredient('Meat', 1),
      new Ingredient('French fries', 20)
    ]),
  new Recipe("Big Fat Burger", "What else do you need to say?",
    "https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d",
    [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 1)
    ])
  ]

  constructor(private slService: ShoppingListService) {}

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}
