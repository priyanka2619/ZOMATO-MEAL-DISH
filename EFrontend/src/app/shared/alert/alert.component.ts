import { Component, OnInit } from '@angular/core';
import { AlertMessage, AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: AlertMessage[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlerts().subscribe((alert) => {
      this.alerts.push(alert);
      // Automatically remove alerts after a certain time (e.g., 5 seconds)
      setTimeout(() => this.removeAlert(alert), 5000);
    });
  }

  removeAlert(alert: AlertMessage) {
    this.alerts = this.alerts.filter((a) => a !== alert);
  }

  getAlertClass(alertType: string): string {
    switch (alertType) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return '';
    }
  }
}

