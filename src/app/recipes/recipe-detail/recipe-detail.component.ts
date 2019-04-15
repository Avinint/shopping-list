import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../../recipes/recipe.service'
import { ActivatedRoute, Router, Params } from '@angular/router'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: []
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.params.subscribe(
        (params: Params) => {
          const id: number = +params['id']
          this.recipe = this.recipeService.getRecipe(id)
        }
      )
  }

  onAddToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
