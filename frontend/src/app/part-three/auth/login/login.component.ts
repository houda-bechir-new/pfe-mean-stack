import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onBackToParts() {
    this.router.navigate(['/']);
  }

  onLogin() {
    this.loading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.auth.login(email, password).then(
      () => {
        
        this.loading = false;
         if( this.auth.userId == "5e614c953dd5d72a6443ec9d")  {
           console.log("super-admin is logged in ..");
         }
         else {
          console.log("admin is logged in ..");
         }

       
          this.router.navigate(['/part-four/new-mission']);
        
      }
    )
    .catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
