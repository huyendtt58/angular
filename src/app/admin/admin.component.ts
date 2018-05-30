import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orders: any[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().pipe(first()).subscribe(orders => this.orders = orders);
  }
}
