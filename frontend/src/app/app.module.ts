import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { EditorModule } from '@tinymce/tinymce-angular';





import { AppComponent } from './app.component';
import { PartOneComponent } from './part-one/part-one.component';
import { PartThreeComponent } from './part-three/part-three.component';
import { PartFourComponent } from './part-four/part-four.component';
import { DefaultComponent } from './default/default.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { StuffListComponent } from './part-one/stuff-list/stuff-list.component';
import { NewThingComponent } from './part-one/new-thing/new-thing.component';
import { SingleThingComponent } from './part-one/single-thing/single-thing.component';
import { ModifyThingComponent } from './part-one/modify-thing/modify-thing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-three/auth/signup/signup.component';
import { NewThingWithUploadComponent } from './part-four/new-thing-with-upload/new-thing-with-upload.component';
import { ModifyThingWithUploadComponent } from './part-four/modify-thing-with-upload/modify-thing-with-upload.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AccueilComponent } from './accueil/accueil.component';
import { AboutComponent } from './accueil/about/about.component';
import { MissionListComponent } from './accueil/mission/mission-list/mission-list.component';
import { NewMissionComponent } from './accueil/mission/new-mission/new-mission.component';
import { ModifyMissionComponent } from './accueil/mission/modify-mission/modify-mission.component';
import { AdminComponent } from './admin/admin.component';
import { NewNewsComponent } from './accueil/news/new-news/new-news.component';
import { NewsListComponent } from './accueil/news/news-list/news-list.component';
import { ModifyNewsComponent } from './accueil/news/modify-news/modify-news.component';

import { NewContactComponent } from './accueil/contact/new-contact/new-contact.component';
import { ContactListComponent } from './accueil/contact/contact-list/contact-list.component';
import { ModifyContactComponent } from './accueil/contact/modify-contact/modify-contact.component';
import { NewEventComponent } from './accueil/event/new-event/new-event.component';
import { EventListComponent } from './accueil/event/event-list/event-list.component';
import { ModifyEventComponent } from './accueil/event/modify-event/modify-event.component';
import { NewPublicationComponent } from './accueil/publication/new-publication/new-publication.component';
import { PublicationListComponent } from './accueil/publication/publication-list/publication-list.component';
import { ModifyPublicationComponent } from './accueil/publication/modify-publication/modify-publication.component';
import { NewEquipeComponent } from './accueil/equipe/new-equipe/new-equipe.component';
import { ModifyEquipeComponent } from './accueil/equipe/modify-equipe/modify-equipe.component';
import { EquipeListComponent } from './accueil/equipe/equipe-list/equipe-list.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { ChangePasswordComponent } from './admin/user/change-password/change-password.component';
import {ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    PartOneComponent,
    PartThreeComponent,
    PartFourComponent,
    DefaultComponent,
    HeaderComponent,
    StuffListComponent,
    NewThingComponent,
    SingleThingComponent,
    ModifyThingComponent,
    LoginComponent,
    SignupComponent,
    NewThingWithUploadComponent,
    ModifyThingWithUploadComponent,
    AccueilComponent,
    AboutComponent,
    MissionListComponent,
    NewMissionComponent,
    ModifyMissionComponent,
    AdminComponent,
    NewNewsComponent,
    NewsListComponent,
    ModifyNewsComponent,
    NewContactComponent,
    ContactListComponent,
    ModifyContactComponent,
    NewEventComponent,
    EventListComponent,
    ModifyEventComponent,
    NewPublicationComponent,
    PublicationListComponent,
    ModifyPublicationComponent,
    NewEquipeComponent,
    ModifyEquipeComponent,
    EquipeListComponent,
    UserListComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
   
    ReactiveFormsModule,
    EditorModule,
    ChatModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
