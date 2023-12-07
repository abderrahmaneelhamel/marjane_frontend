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

  deleteResponisble(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  createResponisble(Responsible: Responsible): Observable<Responsible> {
    return this.http.post<Responsible>(this.apiUrl, Responsible);
  }

  updateResponisble(Responsible: Responsible): Observable<Responsible> {
    const url = `${this.apiUrl}/${Responsible.id}`;
    return this.http.put<Responsible>(url, Responsible);
  }
  
}
