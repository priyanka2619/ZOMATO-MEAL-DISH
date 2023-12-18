import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-restaurant-serving-items',
  templateUrl: './restaurant-serving-items.component.html',
  styleUrls: ['./restaurant-serving-items.component.css']
})
export class RestaurantServingItemsComponent implements OnInit {
  food_category_id: number = 0;
  restaurantList: any[] = [];
  constructor(private route: ActivatedRoute,
    private foodService: FoodService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.food_category_id = res.id
      this.getFoodFromRestaurantByCategoryId(this.food_category_id)

    });
  }

  getFoodFromRestaurantByCategoryId(categoryId: number) {
    this.foodService.getRestaurantServingItemsByCategoryId(categoryId).subscribe((resp: any) => {
      if (resp.statusCode == 200) {
        this.restaurantList = resp.data
      }
    },
      error => {
        this.alertService.error(error.error.detail)
      });
  }

  navigateToOrder(restaurantId: number) {
    this.router.navigate(['/restaurant-food-item', restaurantId, this.food_category_id])
    // https://www.youtube.com/watch?v=5ttHN3XemKo&list=PL7JmcZV0UQtUHQi7kWAI2t3JGWkKaAR9z&index=25
    // 49 minutes in youtube video
  }

}
