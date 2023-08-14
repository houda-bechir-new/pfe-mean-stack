import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';
import { User } from '../../../models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onBackToParts() {
    this.router.navigate(['/default']);
  }


  onSignup() {
    this.loading = true;
    const user = new User();
    user.nom = this.signupForm.get('nom').value;
    user.prenom = this.signupForm.get('prenom').value;
    user.email = this.signupForm.get('email').value;
    user.password = this.signupForm.get('password').value;
    this.auth.createNewUser(user).then(
      () => {
        this.loading = false;
          this.router.navigate(['/part-four/admin']);
        }
      
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
