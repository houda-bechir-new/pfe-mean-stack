import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartFourComponent } from './part-four/part-four.component';
import { AppComponent } from './app.component'
import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-three/auth/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';

import { AccueilComponent } from './accueil/accueil.component';
import { AdminComponent } from './admin/admin.component';

import { AboutComponent } from './accueil/about/about.component';

import { MissionListComponent } from './accueil/mission/mission-list/mission-list.component';
import { NewMissionComponent }  from './accueil/mission/new-mission/new-mission.component';
import { ModifyMissionComponent } from './accueil/mission/modify-mission/modify-mission.component';

import { NewContactComponent } from './accueil/contact/new-contact/new-contact.component';
import { ContactListComponent } from './accueil/contact/contact-list/contact-list.component';
import { ModifyContactComponent } from './accueil/contact/modify-contact/modify-contact.component'

import { NewEventComponent } from './accueil/event/new-event/new-event.component';
import { EventListComponent } from './accueil/event/event-list/event-list.component';
import { ModifyEventComponent } from './accueil/event/modify-event/modify-event.component';

import { NewPublicationComponent } from './accueil/publication/new-publication/new-publication.component';
import { PublicationListComponent } from './accueil/publication/publication-list/publication-list.component';
import { ModifyPublicationComponent } from './accueil/publication/modify-publication/modify-publication.component';

import { NewEquipeComponent } from './accueil/equipe/new-equipe/new-equipe.component';
import { EquipeListComponent } from './accueil/equipe/equipe-list/equipe-list.component';
import { ModifyEquipeComponent } from './accueil/equipe/modify-equipe/modify-equipe.component';

import { UserListComponent } from './admin/user/user-list/user-list.component';

const routes: Routes = [
  { path: 'part-four', component: PartFourComponent,
    children: [
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'new-mission', component: NewMissionComponent},
      { path: 'mission-list', component: MissionListComponent },
      { path: 'modify-mission/:id', component: ModifyMissionComponent },
      
      { path: 'new-contact', component: NewContactComponent},
      { path: 'contact-list', component: ContactListComponent},
      { path: 'modify-contact/:id', component: ModifyContactComponent},

      { path: 'new-publication', component: NewPublicationComponent },
      { path: 'publication-list', component: PublicationListComponent},
      { path: 'modify-publication/:id', component: ModifyPublicationComponent},

      { path: 'new-event', component: NewEventComponent },
      { path: 'event-list', component: EventListComponent},
      { path: 'modify-event/:id', component: ModifyEventComponent},
      
      { path: 'new-equipe', component: NewEquipeComponent },
      { path: 'equipe-list', component: EquipeListComponent},
      { path: 'modify-equipe/:id', component: ModifyEquipeComponent},

      { path: 'signup', component: SignupComponent },
      { path: 'user-list', component: UserListComponent},
    

    ] 
      },
     
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'admin' },
     
  

  { path: 'accueil', component: AccueilComponent,
children: [
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: '**', redirectTo: 'accueil' },
  { path: 'equipe-list', component: EquipeListComponent},
  { path: 'mission-list', component: MissionListComponent },
  { path: 'contact-list', component: ContactListComponent},
  { path: 'publication-list', component: PublicationListComponent},
  { path: 'event-list', component: EventListComponent},
] 
},
    ]},

  { path: '', pathMatch: 'full', component: AccueilComponent },
  { path: '**', redirectTo: '' },
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}
