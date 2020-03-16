import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TicketService } from 'src/app/_services/ticket.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-delete',
  templateUrl: './ticket-delete.component.html',
  styleUrls: ['./ticket-delete.component.css']
})
export class TicketDeleteComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private ticketService: TicketService,
              private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  deleteTicket() {
    this.ticketService.deleteTicket(this.ticketService.ticketShare.id).subscribe(next => {
      this.alertify.success('Ticket deleted successfuly');
      this.router.navigate(['projects/' + this.ticketService.ticketShare.project.id]);
    }, error => {
      this.alertify.error(error);
    });
  }
}
