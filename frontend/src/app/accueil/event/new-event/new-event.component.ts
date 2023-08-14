import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Evenement } from '../../../models/Event.model';
import { mimeType } from '../../../mime-type.validator';
import { StateService } from '../../../services/state.service';
import { EventService } from '../../../services/event.service';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  public eventForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.eventForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required, mimeType],
      date: [null, Validators.required],
      localisation:[null, Validators.required]
  });
  this.userId = this.auth.userId; 

}
onSubmit() {
  this.loading = true;
  const event = new Evenement();
  event.title = this.eventForm.get('title').value;
  event.description = this.eventForm.get('description').value;
  event.date = this.eventForm.get('date').value;
  event.localisation = this.eventForm.get('localisation').value; 
  event.image = ''; 
  event.userId = this.userId;
  this.eventService.createNewEventWithFile(event, this.eventForm.get('image').value).then(
    () => {
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


}
