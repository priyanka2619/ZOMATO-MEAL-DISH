import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.css']
})
export class FoodCategoriesComponent implements OnInit {
  public foodCategoryList: any[] = []

  constructor(private appService: AppService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllFoodcategories()
  }

  getAllFoodcategories() {
    this.appService.getAllFoodCategory().subscribe((resp: any) => {
      if (resp.statusCode == 200) {
        this.foodCategoryList = resp.data
      }
    },
      error => {
        this.alertService.error(error.error.detail)
      });
  }

  navigateTo(item: string) {
    this.router.navigate(['/restaurant-items', item])
  }

}
