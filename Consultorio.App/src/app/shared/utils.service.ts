import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public processarSucesso(type: string, msg: string) {
    return [
      {
        type: type,
        msg: msg,
      },
    ];
  }

  public processarFalha(type: string, fail: any) {
    return [
      {
        type: type,
        msg: `${fail.error.errors}`,
      },
    ];
  }
}
