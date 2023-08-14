import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;
  isLoggedIn= false;
  private user: User[] = [ ];
  public user$ = new Subject<User[]>();

  constructor(private router: Router,
              private http: HttpClient) {}

              getUser() {
                this.http.get('http://localhost:3000/api/user').subscribe(
                  (user: User[]) => {
                    if (user) {
                      this.user = user;
                      this.emitUser();
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            
              emitUser() {
                this.user$.next(this.user);
              }            

  createNewUser(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/signup',user ).subscribe(
          () => {
            this.login(user.email, user.password).then(
              () => {
                resolve();
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/login',
        { email: email, password: password })
        .subscribe(
          (authData: { token: string, userId: string }) => {
            this.token = authData.token;
            this.userId = authData.userId;
            this.isLoggedIn = true;
            this.isAuth$.next(true);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  deleteUser(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/user/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPassword(id: string, user: User) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/user/password'+id, user).subscribe(
        (response) => {
          console.log("change password t3addat ..")
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyUser(id: string, user: User) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/user/' + id, user).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
    this.isLoggedIn = false ;
    
  }
  
  
}
