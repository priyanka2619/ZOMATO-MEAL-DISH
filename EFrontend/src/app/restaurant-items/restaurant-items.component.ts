import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { AlertService } from '../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-items',
  templateUrl: './restaurant-items.component.html',
  styleUrls: ['./restaurant-items.component.css']
})
export class RestaurantItemsComponent implements OnInit {
  categoryId: number = 0;
  restaurantId: number = 0;
  foodItemList: any[] = [];
  cartItemsList: any[] = [];
  cartItems: any;
  user: any

  constructor(private route: ActivatedRoute,
    private foodService: FoodService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.restaurantId = res.restaurantId
      this.categoryId = res.categoryId
      this.fetchFoodItemOfResaurantByCategory(this.restaurantId, this.categoryId);
      this.fetchCartItems()
    });
    let currentUser: any = localStorage.getItem('user_data');
    if (currentUser !== null) {
      this.user = JSON.parse(currentUser);

    }
  }


  fetchFoodItemOfResaurantByCategory(restaurant_id: number, category_id: number) {
    this.foodService.getFoodItemOfRestaurant(restaurant_id, category_id).subscribe((resp: any) => {
      if (resp.statusCode == 200) {
        this.foodItemList = resp.data
      }
    },
      error => {
        this.alertService.error(error.error.detail)
      });

  }

  addToCart(menu_item_id: number) {
    let currentUser: any = localStorage.getItem('user_data');
    if (!currentUser) {
      this.alertService.error("Please Login")
    } else {
      let user = JSON.parse(currentUser)
      let req = {
        "userId": user.id,
        "itemId": menu_item_id,
        "quantity": 1
      }
      this.foodService.addToCart(req).subscribe((resp: any) => {
        if (resp.statusCode == 200) {
          // this.cartItems = resp.data;
          this.fetchCartItems()
          this.alertService.success(resp.message)
        }
      },
        error => {
          this.alertService.error(error.error.detail)
        });
    }
  }

  fetchCartItems() {
    this.foodService.getCartItems(this.user.id, this.restaurantId).subscribe((resp: any) => {
      if (resp.statusCode == 200) {
        this.cartItemsList = resp.data
      }
    },
      error => {
        this.alertService.error(error.error.detail)
      });
  }

}
