import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { OrderComponent } from './order/order.component';
import { FoodCategoriesComponent } from './food-categories/food-categories.component';
import { FoodsComponent } from './foods/foods.component';
import { RestaurantServingItemsComponent } from './restaurant-serving-items/restaurant-serving-items.component';
import { RestaurantItemsComponent } from './restaurant-items/restaurant-items.component';

const routes: Routes = [
  { path: '', redirectTo: 'foods', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'restaurant-items/:categoryname', component: RestaurantsComponent },
  { path: 'order', component: OrderComponent },
  { path: 'food-category', component: FoodCategoriesComponent },
  { path: 'foods', component: FoodsComponent },
  { path: 'restaurant-foods/:id', component: RestaurantServingItemsComponent },
  { path: 'restaurant-food-item/:restaurantId/:categoryId', component: RestaurantItemsComponent },
  // { path: 'add-to-cart', component: RestaurantItemsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
