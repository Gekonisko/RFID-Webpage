import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService  {
  public rfidDTO = new Subject<string>();

  public socket: WebSocket;
  constructor() {
    console.log("WS Connecting...");
    this.socket = new WebSocket("ws://127.0.0.1:8080");


    this.socket.onmessage = (event) => {
      this.rfidDTO.next(event.data);
    };
  }

}
