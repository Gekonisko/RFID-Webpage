import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { RfidDialogComponent } from './rfid-dialog/rfid-dialog.component';
import { WebSocketClientService } from './web-socket-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

}
