import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<AlertMessage>();

  constructor() { }

  getAlerts() {
    return this.alertSubject.asObservable();
  }

  success(message: string) {
    this.alertSubject.next({ type: 'success', message });
  }

  error(message: string) {
    this.alertSubject.next({ type: 'error', message });
  }

  warning(message: string) {
    this.alertSubject.next({ type: 'warning', message });
  }
}


export interface AlertMessage {
  type: 'success' | 'error' | 'warning';
  message: string;
}
