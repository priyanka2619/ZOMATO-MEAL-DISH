import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurantItems: any[] = [];
  quantity: number = 0

  constructor(private route: ActivatedRoute, private appService: AppService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.route.params.subscribe((resp: any) => {
      this.getFoodItemsByCategory(resp.categoryname)

    });
  }

  getFoodItemsByCategory(category_name: string) {
    this.appService.fetchItemByRestaurantAndCategory(category_name).subscribe((resp: any) => {
      if (resp.statusCode == 200) {
        this.restaurantItems = resp.data
      }
    },
      error => {
        this.alertService.error(error.error.detail)
      });
  }

  openCartModal(item: any) {
    const modal = document.getElementById("addToCart");
    if (modal != null) {
      modal.style.display = "block"
    }
  }

  closeCartModal(item: any) {
    const modal = document.getElementById("addToCart");
    if (modal != null) {
      modal.style.display = "none"
    }
  }

  placeOrder() { }

}
