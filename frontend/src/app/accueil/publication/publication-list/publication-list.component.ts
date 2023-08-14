import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from '../../../services/publication.service';
import { Subscription } from 'rxjs';
import { Publication } from '../../../models/Publication.model';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit, OnDestroy  {

  public publications: Publication[] = [];
  public part: number;
  public loading: boolean;
  private partSub: Subscription;
  private publicationsSub: Subscription;
  public publicationId : string ;
  public isloggedin = false ;

  constructor(private publicationService: PublicationService,
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
      this.publicationsSub = this.publicationService.publication$.subscribe(
        (publications) => {
          this.publications = publications;
          this.loading = false;
        }
      );
      this.partSub = this.state.part$.subscribe(
        (part) => {
          this.part = part;
        }
      );
      this.publicationService.getPublication();
    }
  
    onProductClicked(id: string) {
      if (this.part === 4) {
        this.router.navigate(['/part-four/admin/modify-publication/' + id]);
      }
    }
  
    getId(id: string){
      this.publicationId = id;
      console.log('get Id pub t3addat !');
    }
  
    ngOnDestroy() {
      this.publicationsSub.unsubscribe();
      this.partSub.unsubscribe();
    }
  
    onDelete() {
      
  
      this.loading = true;
      this.publicationService.deletePublication(this.publicationId).then(
        () => {
          console.log('delete pub t3addet !');
          this.loading = true;
              this.router.navigate(['/part-four/admin/publication-list']);
              
        }
      );
    }

}