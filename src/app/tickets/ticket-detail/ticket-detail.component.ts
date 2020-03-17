import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/_models/ticket';
import { TicketService } from 'src/app/_services/ticket.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TicketDeleteComponent } from './ticket-delete/ticket-delete.component';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { TicketPut } from 'src/app/_models/ticketPut';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticket: Ticket;
  ticketPut: TicketPut = {
    id: 0, title: '',
    description: '', priority: 0,
    status: 0, typeOfTicket: 0,
    userToId: null, userFromId: 0
  };
  users: User[];
  bsModalRef: BsModalRef;
  config = {
    animated: false
  };
  edit = false;
  testId: string;
  tokenId: number;

  constructor(private modalService: BsModalService, private ticketService: TicketService,
              private alertify: AlertifyService, private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.ticket = data['ticket'];
      // tslint:disable-next-line: no-string-literal
      this.users = data['users'];
    });
    this.ticketService.ticketShare = this.ticket;
    this.tokenId = parseInt(this.authService.decodedToken.nameid, 10);

  }

  assignToMe() {
    this.ticketPut.id = this.ticket.id;
    this.ticketPut.title = this.ticket.title;
    this.ticketPut.description = this.ticket.description;
    this.ticketPut.priority = this.ticket.priority;
    this.ticketPut.status = this.ticket.status;
    this.ticketPut.typeOfTicket = this.ticket.typeOfTicket;
    this.ticketPut.userFromId = this.ticket.userFrom.id;
    this.ticketPut.userToId = this.tokenId;
    this.ticketService.updateTicket(this.ticketPut, this.ticket.id).subscribe(() => {
      this.alertify.success('Ticket assigned successfuly');
      function reload() {
        location.reload();
      }
      setTimeout(reload, 100);
    }, error => {
      this.alertify.error(error);
    });
  }

  updateTicket() {
    this.ticketPut.id = this.ticket.id;
    this.ticketPut.title = this.ticket.title;
    this.ticketPut.description = this.ticket.description;
    this.ticketPut.priority = this.ticket.priority;
    this.ticketPut.status = this.ticket.status;
    this.ticketPut.typeOfTicket = this.ticket.typeOfTicket;
    this.ticketPut.userFromId = this.ticket.userFrom.id;
    this.ticketPut.userToId = parseInt(this.testId, 10);

    this.ticketService.updateTicket(this.ticketPut, this.ticket.id).subscribe(() => {
      this.alertify.success('Ticket updated successfuly');
      function reload() {
        location.reload();
      }
      setTimeout(reload, 100);
    }, error => {
      this.alertify.error(error);
    });
    this.changeFalse();
  }

  // ?????
  changeTrue(): boolean {
    this.edit = true;
    return this.edit;
  }

  changeFalse(): boolean {
    this.edit = false;
    return this.edit;
  }

  openModalDeleteTicket() {
    this.bsModalRef = this.modalService.show(TicketDeleteComponent, this.config);
  }



  isAuthor(): boolean {
    return this.ticket.userFrom.id === this.tokenId;
  }

}
