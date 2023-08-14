import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { EventService } from '../../../services/event.service';
import { Evenement } from '../../../models/Event.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { mimeType } from '../../../mime-type.validator';


@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.component.html',
  styleUrls: ['./modify-event.component.scss']
})
export class ModifyEventComponent implements OnInit, OnDestroy {

  public eventForm: FormGroup;
  public event: Evenement;
  public loading: boolean;
  public errorMessage: string;
  public part: number;
  private partSub: Subscription;
  public imagePreview: string;

 
  
  constructor( private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService,
    private eventService: EventService,
    private formBuilder: FormBuilder,) { }

    ngOnInit() {
      this.loading = true;
      this.state.mode$.next('form');
      this.partSub = this.state.part$.subscribe(
        (part) => {
          this.part = part;
        }
      );
     
      this.route.params.subscribe(
        (params: Params) => {
          this.eventService.getEventById(params.id).then(
            (event: Evenement) => {
              this.event = event;
              
              this.eventForm = this.formBuilder.group({
                title: [event.title, Validators.required],
                date: [event.date, Validators.required],
                description: [event.description, Validators.required],
                localisation: [event.localisation, Validators.required],
                image: [event.image, Validators.required, mimeType],
              });
              this.imagePreview = event.image;
            this.loading = false;
             
            }
          );
        }
      );
    }
  
    onSubmit() {
      this.loading = true;
      const event = new Evenement();
      event._id = this.event._id;
      event.title = this.eventForm.get('title').value;
      event.description = this.eventForm.get('description').value;
      event.date = this.eventForm.get('date').value;
      event.localisation = this.eventForm.get('localisation').value; 
      event.image = ''; 
      console.log(this.eventForm.get('image').value);
      this.eventService.modifyEventWithFile(this.event._id, event, this.eventForm.get('image').value).then(
        () => {
          console.log('modify event  t3addat');
          console.log(this.event.image);
          this.eventForm.reset();
          this.loading = false;
          this.router.navigate(['/part-four/admin/event-list']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error.message;
        }
      );
    }
 
  
    onImagePick(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      console.log(file);
      this.eventForm.get('image').patchValue(file);
      this.eventForm.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        if (this.eventForm.get('image').valid) {
          this.imagePreview = reader.result as string;
        } else {
          this.imagePreview = null;
        }
      };
      reader.readAsDataURL(file);
    }
    ngOnDestroy() {
      this.partSub.unsubscribe();
    }

}
