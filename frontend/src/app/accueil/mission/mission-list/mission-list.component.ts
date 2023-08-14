import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../../../services/mission.service';
import { Subscription } from 'rxjs';
import { Mission } from '../../../models/Mission.model';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';





@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit, OnDestroy  {

public missions: Mission[] = [];
public part: number;
public loading: boolean;
private partSub: Subscription;
private missionsSub: Subscription;
public missionId : string ;
public isloggedin = false ;


  constructor(private missionService: MissionService,
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
    this.missionsSub = this.missionService.missions$.subscribe(
      (missions) => {
        this.missions = missions;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.missionService.getMissions();
  }

  onProductClicked(id: string) {
    if (this.part === 4) {
      this.router.navigate(['/part-four/admin/modify-mission/' + id]);
    }
  }

  getId(id: string){
    this.missionId = id;
    console.log('get Id t3addat !');
  }

  ngOnDestroy() {
    this.missionsSub.unsubscribe();
    this.partSub.unsubscribe();
  }

  onDelete() {
    

    this.loading = true;
    this.missionService.deleteMission(this.missionId).then(
      () => {
        console.log('delete t3addet !');
        this.loading = true;
            this.router.navigate(['/part-four/admin/mission-list']);
            
      }
    );
  }


}
