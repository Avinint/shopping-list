import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping.list.edit.component.html',
  styleUrls: ['./shopping.list.edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm
  subscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
        (index: number) => {
          this.editMode = true
          this.editedItemIndex = index
          this.editedItem = this.shoppingListService.getIngredient(index)
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount)
    if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
        this.onClear()

    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onDelete() {
      this.shoppingListService.deleteIngredient(this.editedItemIndex)
      this.onClear()
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false
  }
}
