import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { }

  login(login: string, password: string) {
    return this.http.post(this.baseUrl + "api/login", { login, password }, { responseType:'text'});
  }

  rfidTwoFA(id:string) {
    return this.http.post(this.baseUrl + "api/rfid", { id }, { responseType:'text'});
  }
}
