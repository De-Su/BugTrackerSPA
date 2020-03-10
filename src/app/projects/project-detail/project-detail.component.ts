import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/_models/project';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TicketAddComponent } from 'src/app/tickets/ticket-add/ticket-add.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  bsModalRef: BsModalRef;
  config = {
    animated: true
  };

  constructor(private modalService: BsModalService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.project = data['project'];
    });
  }

  openModalAddTicket() {
    this.bsModalRef = this.modalService.show(TicketAddComponent, this.config);
  }
}
