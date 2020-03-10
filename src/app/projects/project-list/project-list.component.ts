import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/project';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ProjectAddComponent } from '../project-add/project-add.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  bsModalRef: BsModalRef;
  config = {
    animated: false
  };

  constructor(private modalService: BsModalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.projects = data['projects'];
    });
  }

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(ProjectAddComponent, this.config);
  }

}
