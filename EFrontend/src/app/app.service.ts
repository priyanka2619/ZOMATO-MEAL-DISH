import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  API_URL: string = "http://localhost:8000/"

  constructor(private http: HttpClient) { }


  createSignup(req: any) {
    return this.http.post(this.API_URL + 'api/v1/account/sign-up', req)
  }

  createLogin(req: any) {
    return this.http.post(this.API_URL + 'api/v1/account/login', req)
  }

  getAllFoodCategory() {
    return this.http.get(this.API_URL + "api/v1/food/categories/")
  }

  fetchItemByRestaurantAndCategory(name: string) {
    return this.http.get(this.API_URL + `api/v1/restaurant/items?category=${name}`)
  }
}
