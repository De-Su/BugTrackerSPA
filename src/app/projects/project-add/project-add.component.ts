import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProjectService } from 'src/app/_services/project.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Project } from 'src/app/_models/project';
import { ProjectPost } from 'src/app/_models/projectPost';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  project: ProjectPost;

  constructor(public bsModalRef: BsModalRef, private router: Router, private alertify: AlertifyService,
              private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit() {
    this.project = {title: '', description: '', userId: parseInt(this.authService.decodedToken.nameid, 10)};
  }

  addProject() {
    this.projectService.addProject(this.project).subscribe((data: Project) => {

      this.alertify.success('Project has been added');
      this.router.navigate(['/projects/' + data.id]);
    }, error => {
      this.alertify.error(error);
    });
  }

}
