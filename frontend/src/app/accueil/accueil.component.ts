import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  element: HTMLElement;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

  getComponent(id: string){
    document.getElementById(id).click();
 
    console.log( document.getElementById(id))

   


  }

}
