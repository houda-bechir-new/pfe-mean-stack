import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { User } from '../../../models/User.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
 
  public userForm: FormGroup;
  public user: User;
  public loading: boolean;
  public errorMessage: string;
  public part: number;
  private partSub: Subscription;
 

  constructor( private userService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService,
    private formBuilder: FormBuilder,) { }

    ngOnInit() {
      this.loading = true;
      this.state.mode$.next('form');
      this.userForm = this.formBuilder.group({
        password: [null, Validators.required],
       
      });
      this.partSub = this.state.part$.subscribe(
        (part) => {
          this.part = part;
        }
      );
     
    }
}
