import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/_models/project';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TicketAddComponent } from 'src/app/tickets/ticket-add/ticket-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectService } from 'src/app/_services/project.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ProjectDeleteComponent } from './project-delete/project-delete.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  bsModalRef: BsModalRef;
  config = {
    animated: false
  };

  constructor(private modalService: BsModalService, private alertify: AlertifyService,
              private route: ActivatedRoute, private projectService: ProjectService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.project = data['project'];
    });
    this.projectService.projectShare = this.project;
  }

  openModalAddTicket() {
    this.bsModalRef = this.modalService.show(TicketAddComponent, this.config);
  }

  openModalEditProject() {
    this.bsModalRef = this.modalService.show(ProjectEditComponent, this.config);
  }

  openModalDeleteProject() {
    this.bsModalRef = this.modalService.show(ProjectDeleteComponent, this.config);
  }

  isAuthor(): boolean {
    return this.project.user.id === parseInt(this.authService.decodedToken.nameid, 10);
  }
}
