import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsible } from 'src/app/Interfaces/Responsible';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {
  private apiUrl: string = "http://localhost:8080/api/v3/responsibles";

  constructor(private http : HttpClient) { }

  getResponisbles(): Observable<Responsible[]>{
    console.log(this.http.get<Responsible[]>(this.apiUrl));
    return this.http.get<Responsible[]>(this.apiUrl);
  }

  
  
}
