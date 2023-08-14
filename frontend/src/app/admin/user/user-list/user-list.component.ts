import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/User.model';
import { StateService } from '../../../services/state.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  public part: number;
  public loading: boolean;
  private partSub: Subscription;
  private usersSub: Subscription;
  public userId : string ;
  

  constructor(private userService: AuthService,
    private state: StateService,
    private router: Router) { }

 ngOnInit() {
      this.loading = true;
      this.state.mode$.next('list');
      this.usersSub = this.userService.user$.subscribe(
        (users) => {
          this.users = users;
          this.loading = false;
        }
      );
      this.partSub = this.state.part$.subscribe(
        (part) => {
          this.part = part;
        }
      );
      this.userService.getUser();
    }
  

    getId(id: string){
      this.userId = id;
      console.log('get Id t3addat !');
    }
  
    ngOnDestroy() {
      this.usersSub.unsubscribe();
      this.partSub.unsubscribe();
    }
  
    onDelete() {
      
  
      this.loading = true;
      this.userService.deleteUser(this.userId).then(
        () => {
          console.log('delete t3addet !');
          this.loading = false;
            this.router.navigate(['/part-four/admin/user-list']);
          
              
        }
      );
    }}

