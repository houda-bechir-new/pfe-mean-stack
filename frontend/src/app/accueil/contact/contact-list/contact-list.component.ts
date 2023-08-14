import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { Subscription } from 'rxjs';
import { Contact } from '../../../models/Contact.model';
import { StateService } from '../../../services/state.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  public contacts: Contact[] = [];
  public part: number;
  public loading: boolean;
  private partSub: Subscription;
  private contactsSub: Subscription;
  public contactId : string ;
  private isloggedin = false ;
  
  
    constructor(private contactService: ContactService,
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
      this.contactsSub = this.contactService.contacts$.subscribe(
        (contacts) => {
          this.contacts = contacts;
          this.loading = false;
        }
      );
      this.partSub = this.state.part$.subscribe(
        (part) => {
          this.part = part;
        }
      );
      this.contactService.getContacts();
    }
  
    onProductClicked(id: string) {
      if (this.part === 4) {
        this.router.navigate(['/part-four/admin/modify-contact/' + id]);
      }
    }
  
   
  
    ngOnDestroy() {
      this.contactsSub.unsubscribe();
      this.partSub.unsubscribe();
    }
  
   
  
  
}
