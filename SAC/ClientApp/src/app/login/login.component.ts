import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import { RfidDialogComponent } from '../rfid-dialog/rfid-dialog.component';
import { WebSocketClientService } from '../web-socket-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = "";
  password = "";

  constructor(public http: HttpClient, public autorizationService: AuthorizationService, public dialog: MatDialog, public webSocketClientService: WebSocketClientService) {

  }

  async OnLogin() {

    await firstValueFrom(this.autorizationService.login(this.login, this.password));

    this.dialog.open(RfidDialogComponent, {
      width: '350px'
    });

  }
}
