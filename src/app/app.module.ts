import { NgModule }                       from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { BrowserModule }                  from '@angular/platform-browser';
import { HttpClientModule }               from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }            from './in-memory-data.service';

import { AppComponent }          from './app.component';
import { MembersComponent }      from './members/members.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MessagesComponent }     from './messages/messages.component';
import { AppRoutingModule }      from './app-routing.module';
import { DashboardComponent }    from './dashboard/dashboard.component';
import { MemberSearchComponent } from './member-search/member-search.component';
import { NotfoundComponent }     from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    MemberDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MemberSearchComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
