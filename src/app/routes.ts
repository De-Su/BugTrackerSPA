import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { ProjectListResolver } from './_resolvers/project-list.resolver';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectDetailResolver } from './_resolvers/project-detail.resolver';
import { TicketListResolver } from './_resolvers/ticket-list.resolver';
import { TicketDetailResolver } from './_resolvers/ticket-detail.resolver';
import { TicketDetailComponent } from './tickets/ticket-detail/ticket-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsafed-changes.guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
      { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
      { path: 'member/edit', component: MemberEditComponent,
          resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
      { path: 'messages', component: MessagesComponent },
      { path: 'projects', component: ProjectListComponent, resolve: {projects: ProjectListResolver} },
      { path: 'projects/:id', component: ProjectDetailComponent, resolve: {project: ProjectDetailResolver} },
      { path: 'tickets', component: TicketListComponent, resolve: {tickets: TicketListResolver} },
      { path: 'tickets/:id', component: TicketDetailComponent, resolve: {ticket: TicketDetailResolver} }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
