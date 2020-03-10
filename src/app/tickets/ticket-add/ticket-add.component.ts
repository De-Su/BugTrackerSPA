import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/_models/ticket';
import { TicketPost } from 'src/app/_models/ticketPost';
import { BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TicketService } from 'src/app/_services/ticket.service';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent implements OnInit {

  ticket: TicketPost;
  projectIdFromRequest: number;

  constructor(public bsModalRef: BsModalRef, private router: Router, private alertify: AlertifyService,
              private ticketService: TicketService, private authService: AuthService) { }

  ngOnInit() {
    this.getProjectId();

    this.ticket = {
      title: '',
      description: '',
      priority: 0,
      status: 0,
      typeOfTicket: 0,
      projectId: this.projectIdFromRequest,
      userFromId: parseInt(this.authService.decodedToken.nameid, 10)
    };
  }

  getProjectId() {
    const str = this.router.routerState.snapshot.url;
    this.projectIdFromRequest = parseInt(str.replace('/projects/', ''), 10);
  }

  addTicket() {
    this.ticketService.addTicket(this.ticket).subscribe((data: Ticket) => {

      this.alertify.success('Ticket has been added');
      this.router.navigate(['/tickets/' + data.id]);
    }, error => {
      this.alertify.error(error);
    });
  }

}
