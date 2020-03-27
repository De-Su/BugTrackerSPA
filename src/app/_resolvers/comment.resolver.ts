import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommentService } from '../_services/comment.service';

@Injectable()
export class CommentResolver implements Resolve<Comment[]> {
    constructor(private commentService: CommentService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Comment[]> {
        return this.commentService.getComments().pipe(
            catchError(() => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/tickets']);
                return of(null);
            })
        );
    }
}
