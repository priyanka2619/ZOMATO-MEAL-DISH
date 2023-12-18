import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertComponent } from './shared/alert/alert.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { FoodCategoriesComponent } from './food-categories/food-categories.component';
import { OrderComponent } from './order/order.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FoodsComponent } from './foods/foods.component';
import { RestaurantItemsComponent } from './restaurant-items/restaurant-items.component';
import { RestaurantServingItemsComponent } from './restaurant-serving-items/restaurant-serving-items.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AlertComponent,
    RestaurantsComponent,
    FoodCategoriesComponent,
    OrderComponent,
    NavbarComponent,
    FoodsComponent,
    RestaurantItemsComponent,
    RestaurantServingItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
