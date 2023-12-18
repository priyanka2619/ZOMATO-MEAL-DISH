import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  foodCategoryList: any = []
  constructor(private foodService: FoodService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllFoodCategories()
  }

  getAllFoodCategories() {
    this.foodService.getAllFoods().subscribe((resp: any) => {
      if (resp.statusCode == 200) {
        this.foodCategoryList = resp.data
      }
    },
      error => {
        this.alertService.error(error.error.detail)
      });
  }

  getImageUrl(category: any): string {
    let img = category.image.split('/').pop()
    return `assets/images/${category.image.split('/').pop()}`;
  }

  navigateToRestaurant(categoryId: number) {
    this.router.navigate(['/restaurant-foods', categoryId])
  }

}
