import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantServingItemsComponent } from './restaurant-serving-items.component';

describe('RestaurantServingItemsComponent', () => {
  let component: RestaurantServingItemsComponent;
  let fixture: ComponentFixture<RestaurantServingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantServingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantServingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
