import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Comment } from 'src/app/_models/comment';
import { CommentService } from 'src/app/_services/comment.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ReversePipe } from 'ngx-pipes';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() users: User[];
  comment: Comment;
  myId: number;
  newComments: Comment[];

  constructor(private commentService: CommentService, private alertify: AlertifyService,
              private router: Router, private authService: AuthService, private reverse: ReversePipe ) {
   }

  ngOnInit() {
    this.comment = {
      id: 0,
      userId: 0,
      ticketId: 0,
      content: ''
    };
    this.myId = parseInt(this.authService.decodedToken.nameid, 10);
    this.newComments = this.reverse.transform(this.comments);
    console.log(this.comments);
    console.log(this.users);
  }

  selectUser(id: number): User {
    return this.users.find(user => user.id === id);
  }

  addComment() {
    this.commentService.addComment(this.comment).subscribe((data: Comment) => {

      this.alertify.success('Comment has been added');
      this.newComments.unshift(data);
      // console.log(data);
      // this.router.navigate['tickets/' + data.ticketId]
      // location.reload();

    }, error => {
      this.alertify.error(error);
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(() => {
      this.comments.splice(this.comments.findIndex(c => c.id === id), 1);
      function reload() {
        location.reload();
      }
      setTimeout(reload, 100);
      this.alertify.success('Comment deleted successfuly');
    }, error => {
      this.alertify.error('Failed to delete commment');
    });
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
