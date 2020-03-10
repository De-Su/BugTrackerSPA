import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, TabsModule, BsModalService } from 'ngx-bootstrap/';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
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
import { ProjectAddComponent } from './projects/project-add/project-add.component';
import { TicketAddComponent } from './tickets/ticket-add/ticket-add.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ProjectListComponent,
      TicketListComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      ProjectDetailComponent,
      TicketDetailComponent,
      MemberEditComponent,
      ProjectAddComponent,
      TicketAddComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      JwtModule.forRoot({
         config: {
           tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth']
         }
       }),
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot()
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      MemberDetailResolver,
      MemberListResolver,
      ProjectListResolver,
      ProjectDetailResolver,
      TicketListResolver,
      TicketDetailResolver,
      MemberEditResolver,
      PreventUnsavedChanges,
      BsModalService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
