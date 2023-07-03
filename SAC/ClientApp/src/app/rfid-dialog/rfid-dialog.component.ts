import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WebSocketClientService } from '../web-socket-client.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rfid-dialog',
  templateUrl: './rfid-dialog.component.html',
  styleUrls: ['./rfid-dialog.component.css']
})
export class RfidDialogComponent implements OnInit, OnDestroy {
  public rfidDTO: { id: string, at: Date };
;

  public subscribe: Subscription;
  constructor(public dialogRef: MatDialogRef<RfidDialogComponent>, public webSocketClientService: WebSocketClientService, public authorizationService: AuthorizationService, public router: Router) { }


  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
    }


  ngOnInit(): void {
    this.subscribe = this.webSocketClientService.rfidDTO.subscribe(async (event) => {
      this.rfidDTO = JSON.parse(event);
      this.rfidDTO.at = new Date(this.rfidDTO.at);

      try {
        await firstValueFrom(this.authorizationService.rfidTwoFA(this.rfidDTO.id));
        this.router.navigate(["/home"])
        this.dialogRef.close();
      } catch  { }

    });
  }


}
