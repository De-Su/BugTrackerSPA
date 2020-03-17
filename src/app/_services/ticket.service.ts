import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../_models/ticket';
import { Observable } from 'rxjs';
import { TicketPost } from '../_models/ticketPost';
import { TicketPut } from '../_models/ticketPut';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticketShare: Ticket;
  usersShare: User[];

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl + 'tickets');
  }

  getTicket(id): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrl + 'tickets/' + id);
  }

  addTicket(ticket: TicketPost) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.baseUrl + 'tickets/', ticket, httpOptions);
  }

  updateTicket(ticket: TicketPut, id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.baseUrl + 'tickets/' + id, ticket, httpOptions);
  }

  deleteTicket(id: number) {
    return this.http.delete(this.baseUrl + 'tickets/' + id);
  }

  deleteImage(id: number) {
    return this.http.delete(this.baseUrl + 'tickets/' + this.ticketShare.id + '/images/' + id);
  }

}
