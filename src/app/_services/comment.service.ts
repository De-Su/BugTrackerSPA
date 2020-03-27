import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketService } from './ticket.service';
import { Comment } from 'src/app/_models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private ticket: TicketService) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + '/tickets/' + this.ticket.ticketShare.id + '/comments');
  }

  addComment(comment: Comment) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.baseUrl + 'tickets/' + this.ticket.ticketShare.id + '/comments', comment, httpOptions);
  }

  deleteComment(id: number) {
    return this.http.delete(this.baseUrl + 'tickets/' + this.ticket.ticketShare.id + '/comments/' + id);
  }

}
