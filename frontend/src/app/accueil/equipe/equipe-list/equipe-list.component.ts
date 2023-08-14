import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipeService } from '../../../services/equipe.service';
import { Subscription } from 'rxjs';
import { Equipe } from '../../../models/Equipe.model';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.scss']
})
export class EquipeListComponent implements OnInit, OnDestroy {

  public equipes: Equipe[] = [];
  public part: number;
  public loading: boolean;
  private partSub: Subscription;
  private equipeSub: Subscription;
  public equipeId : string ;
  public isloggedin = false ;
  
  
    constructor(private equipeService: EquipeService,
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
    console.log("user is logged in :"+this.isloggedin)
    console.log("user id :"+this.auth.userId)
    this.loading = true;
    this.state.mode$.next('list');
    this.equipeSub = this.equipeService.equipe$.subscribe(
      (equipes) => {
        this.equipes = equipes;
        this.loading = false;
       
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.equipeService.getEquipe();
    
  }

  onProductClicked(id: string) {
    if (this.part === 4) {
      this.router.navigate(['/part-four/admin/modify-equipe/' + id]);
    }
  }

  getId(id: string){
    this.equipeId = id;
    console.log('get Id equipe t3addat !');
  }

  ngOnDestroy() {
    this.equipeSub.unsubscribe();
    this.partSub.unsubscribe();
    
  }

  onDelete() {
    

    this.loading = true;
    this.equipeService.deleteEquipe(this.equipeId).then(
      () => {
        console.log('delete equipe t3addet !');
        this.loading = false;
          this.router.navigate(['/part-four/admin/equipe-list']);
        
            
      }
    );
  }

}
