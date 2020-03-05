import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../_models/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl + 'tickets');
  }

  getTicket(id): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrl + 'tickets/' + id);
  }
}
