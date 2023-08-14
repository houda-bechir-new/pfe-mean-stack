import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private isButtonVisible = true;

  constructor( private auth: AuthService) { }

  ngOnInit() {
    if( this.auth.userId == "5e614c953dd5d72a6443ec9d")  {
      this.isButtonVisible = false;
    }
    else {
      this.isButtonVisible = true;    }

  }

}
