import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  API_URL: string = "http://localhost:8000/"

  constructor(private http: HttpClient) { }

  getAllFoods() {
    return this.http.get(this.API_URL + "api/v1/food/getAllFoodCategory/")
  }

  getRestaurantServingItemsByCategoryId(categoryId: any) {
    return this.http.get(this.API_URL + `api/v1/restaurant/getRestaurantServingItemsByCategoryId?categoryId=${categoryId}`)
  }

  getFoodItemOfRestaurant(restaurantId: any, categoryId: any) {
    return this.http.get(this.API_URL + `api/v1/restaurant/getFoodItemOfRestaurantByCategory?restaurantId=${restaurantId}&categoryId=${categoryId}`)
  }

  addToCart(params: any) {
    return this.http.post(this.API_URL + "api/v1/restaurant/add-to-cart/", params)
  }

  getCartItems(restaurantId: number, customerId: number) {
    return this.http.get(this.API_URL + `api/v1/restaurant/getFoodItemOfRestaurantByCategory?customerId=${customerId}&restaurantId=${restaurantId}`)
  }
}
