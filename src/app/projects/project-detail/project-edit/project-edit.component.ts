import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectPost } from 'src/app/_models/projectPost';
import { ProjectService } from 'src/app/_services/project.service';
import { Project } from 'src/app/_models/project';
import { ProjectPut } from 'src/app/_models/projectPut';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  project: ProjectPut = { id: 0, title: '', description: '', userId: 0};

  constructor(public bsModalRef: BsModalRef, private alertify: AlertifyService, private route: ActivatedRoute,
              public projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.project.id = this.projectService.projectShare.id;
    this.project.title = this.projectService.projectShare.title;
    this.project.description = this.projectService.projectShare.description;
    this.project.userId = this.projectService.projectShare.user.id;
  }

  updateProject() {
    this.projectService.updateProject(this.project, this.project.id).subscribe(next => {
      this.alertify.success('Project updated successfuly');
      function reload() {
        location.reload();
      }
      setTimeout(reload, 100);
    }, error => {
      this.alertify.error(error);
    });
  }

}
