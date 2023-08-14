import { Component, OnInit, OnDestroy  } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Contact } from '../../../models/Contact.model';
import { ContactService } from '../../../services/contact.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit, OnDestroy  {
  
  public editorForm: FormGroup;
  public contactForm: FormGroup;
  public loading = false;
  public part: number;
  public errorMessage: string;
  private partSub: Subscription;


  constructor(private state: StateService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.contactForm = this.formBuilder.group({
      numtel: [null, Validators.required],
      mail: [null, [Validators.required, Validators.email]],
      youtube: [null, Validators.required],
      linkedin: [null, Validators.required],
      facebook: [null, Validators.required],
     
    });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );

    this.editorForm = new FormGroup({
      'editor' : new FormControl(null)
    })
  }
  
  onSubmit() {
    this.loading = true;
    const contact = new Contact();
    contact.numtel = this.contactForm.get('numtel').value;
    contact.mail = this.contactForm.get('mail').value;
    contact.youtube = this.contactForm.get('youtube').value;
    contact.linkedin = this.contactForm.get('linkedin').value;
    contact.facebook = this.contactForm.get('facebook').value;

    contact._id = new Date().getTime().toString();
    this.contactService.createNewContact(contact).then(
      () => {
        console.log("new contact cv");
        this.contactForm.reset();
        this.loading = false;
        switch (this.part) {
          case 4:
            this.router.navigate(['/part-four/admin/contact-list']);
            break;
           
        }})
      
    .catch(
      (error) => {
        console.log("new contact mich cv -___-");
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }


}
