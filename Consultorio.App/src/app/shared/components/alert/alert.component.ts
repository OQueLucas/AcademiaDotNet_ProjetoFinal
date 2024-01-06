import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  dismissible = true;

  @Input() alerts: any[] = [];
  @Input() type: string = 'danger';

  onClosed(dismissedAlert): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
