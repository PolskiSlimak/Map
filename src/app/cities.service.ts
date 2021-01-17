import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {}
   getCapitals() {
     return this.http.get("http://api.worldbank.org/v2/country?format=json");
   }
}
