import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from '../_models/ticket';
import { TicketService } from '../_services/ticket.service';

@Injectable()
export class TicketDetailResolver implements Resolve<Ticket> {
    constructor(private ticketService: TicketService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Ticket> {
        // tslint:disable-next-line: no-string-literal
        return this.ticketService.getTicket(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/tickets']);
                return of(null);
            })
        );
    }
}
