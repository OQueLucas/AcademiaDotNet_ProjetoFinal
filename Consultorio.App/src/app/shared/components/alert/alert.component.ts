import { Component, Input } from '@angular/core';

type AlertType = { type: string; msg: string };

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  dismissible = true;
  defaultAlerts: AlertType[] = [
    {
      type: 'success',
      msg: `You successfully read this important alert message.`,
    },
    {
      type: 'info',
      msg: `This alert needs your attention, but it's not super important.`,
    },
    {
      type: 'danger',
      msg: `Better check yourself, you're not looking too good.`,
    },
  ];

  @Input() alerts: AlertType[];

  onClosed(dismissedAlert: AlertType): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
