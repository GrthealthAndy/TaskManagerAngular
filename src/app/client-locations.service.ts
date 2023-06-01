import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientLocation } from './client-location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationsService {

  constructor(private httpClient: HttpClient) { }

  getClientLocations() : Observable<ClientLocation[]>
  {
   return this.httpClient.get<ClientLocation[]>("/api/clientlocations", {responseType:"json"});
    // return this.httpClient.get<ClientLocation[]>("http://localhost:4200/api/clientlocations", {responseType:"json"});
  }
}
