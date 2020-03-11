import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ProjectService } from 'src/app/_services/project.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.css']
})
export class ProjectDeleteComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private projectService: ProjectService,
              private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  deleteProject() {
    this.projectService.deleteProject(this.projectService.projectShare.id).subscribe(next => {
      this.alertify.success('Project deleted successfuly');
      this.router.navigate(['projects/']);
    }, error => {
      this.alertify.error(error);
    });
  }
}
