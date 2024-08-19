import { h, Component, Prop, State, Host } from '@stencil/core';

const meals = [
  { oId: 1, name: 'Breakfast' },
  { oId: 2, name: 'AM Snack' },
  { oId: 3, name: 'Lunch' },
  { oId: 4, name: 'PM Snack' },
  { oId: 5, name: 'Dinner' }
];

@Component({
  tag: 'meals-list',
  styleUrl: 'meals-list.scss',
  shadow: true
})
export class MealsList {
  @Prop() meals: any[];
  @State() selectedMeal: any = meals[0];

  constructor() {
    this.meals = meals;
  }

  isSelected(meal) {
    return  this.selectedMeal && this.selectedMeal.oId === meal.oId;
  }

  setMeal(meal) {
    console.log(meal);
    this.selectedMeal = meal;
  }

  render() {
    return (
      <Host>
        <aqua-list>
          {this.meals.map((meal) => (
            <aqua-list-item
              key={meal.name}
              value={meal}
              selected={this.isSelected(meal)}
              onOnItemSelected={(event) => this.setMeal(event.detail)}
            >
              <span slot="content">{meal.name}</span>
              <aqua-icon slot="end" icon="chevron_right" width={16} height={16}></aqua-icon>
            </aqua-list-item>
          ))}
        </aqua-list>
      </Host>
    );
  }
}