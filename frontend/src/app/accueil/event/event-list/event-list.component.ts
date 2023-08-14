import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Subscription } from 'rxjs';
import { Evenement } from '../../../models/Event.model';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  public events: Evenement[] = [];
  public part: number;
  public loading: boolean;
  private partSub: Subscription;
  private eventsSub: Subscription;
  public eventId : string ;
  public isloggedin = false ;
  
  
    constructor(private eventService: EventService,
                private state: StateService,
                private router: Router,
                private auth : AuthService) { }
  
    ngOnInit() {
      if( this.auth.isLoggedIn) {
        this.isloggedin = true;
      }
      else  {
        this.isloggedin = false ;
      }
      this.loading = true;
      this.state.mode$.next('list');
      this.eventsSub = this.eventService.event$.subscribe(
        (events) => {
          this.events = events;
          this.loading = false;
        }
      );
      this.partSub = this.state.part$.subscribe(
        (part) => {
          this.part = part;
        }
      );
      this.eventService.getEvent();
    }
  
    onProductClicked(id: string) {
      if (this.part === 4) {
        this.router.navigate(['/part-four/admin/modify-event/' + id]);
      }
    }
  
    getId(id: string){
      this.eventId = id;
      console.log('get Id t3addat !');
    }
  
    ngOnDestroy() {
      this.eventsSub.unsubscribe();
      this.partSub.unsubscribe();
      this.isloggedin = false ;
    }
  
    onDelete() {
      
  
      this.loading = true;
      this.eventService.deleteEvent(this.eventId).then(
        () => {
          console.log('delete t3addet !');
          this.loading = false;
            this.router.navigate(['/part-four/admin/event-list']);
          
              
        }
      );
    }}
