import { Component, OnInit, OnDestroy  } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Contact } from '../../../models/Contact.model';
import { ContactService } from '../../../services/contact.service';
import {  ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-modify-contact',
  templateUrl: './modify-contact.component.html',
  styleUrls: ['./modify-contact.component.scss']
})
export class ModifyContactComponent implements OnInit, OnDestroy {
  public contactForm: FormGroup;
  public contact: Contact;
  public loading = false;
  public part: number;
  public errorMessage: string;
  private partSub: Subscription;


  constructor(private state: StateService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService

    ) { }

  ngOnInit() {
    this.loading = true;
      this.state.mode$.next('modify-contact');

      this.route.params.subscribe(
        (params: Params) => {
          this.contactService.getContactById(params.id).then(
            (contact: Contact) => {
              this.contact = contact;
              this.contactForm = this.formBuilder.group({
                numtel: [contact.numtel, Validators.required],
                mail: [contact.mail, Validators.required],
                youtube: [contact.youtube, Validators.required],
                linkedin: [contact.linkedin, Validators.required],
                facebook: [contact.facebook, Validators.required],
               
              });
              this.loading = false;
            }
          )
        }
      )
    
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );

  
  }
  
  onSubmit() {
    this.loading = true;
    const contact = new Contact();
    contact._id = this.contact._id;
    contact.numtel = this.contactForm.get('numtel').value;
    contact.mail = this.contactForm.get('mail').value;
    contact.youtube = this.contactForm.get('youtube').value;
    contact.linkedin = this.contactForm.get('linkedin').value;
    contact.facebook = this.contactForm.get('facebook').value;

    
    this.contactService.modifyContact(contact._id, contact).then(
      () => {
        console.log("modify contact cv");
        this.contactForm.reset();
        this.loading = false;
       
            this.router.navigate(['/part-four/admin/contact-list']);
           
           
        })
      
    .catch(
      (error) => {
        console.log("modify contact mich cv -___-");
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }


}
