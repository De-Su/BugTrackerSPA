import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'tickets', component: TicketListComponent },
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
