import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Publication } from '../../../models/Publication.model';
import { mimeType } from '../../../mime-type.validator';
import { StateService } from '../../../services/state.service';
import { PublicationService } from '../../../services/publication.service';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrls: ['./new-publication.component.scss']
})
export class NewPublicationComponent implements OnInit {

  public publicationForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;


  constructor(private state: StateService,
    private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private router: Router,
    private auth: AuthService) { }

    ngOnInit() {
      this.state.mode$.next('form');
      this.publicationForm = this.formBuilder.group({
        title: [null, Validators.required],
        description: [null, Validators.required],
        image: [null, Validators.required, mimeType],
        detail: [null, Validators.required],
      
    });
    this.userId = this.auth.userId; 
  
  }
  onSubmit() {
    this.loading = true;
    const publication = new Publication();
    publication.title = this.publicationForm.get('title').value;
    publication.description = this.publicationForm.get('description').value;
    publication.detail = this.publicationForm.get('detail').value;
    publication.image = ''; 
    publication.userId = this.userId;
    this.publicationService.createNewPublicationWithFile(publication, this.publicationForm.get('image').value).then(
      () => {
        this.publicationForm.reset();
        this.loading = false;
        this.router.navigate(['/part-four/admin/publication-list']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
  
  
  
  
    onImagePick(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.publicationForm.get('image').patchValue(file);
      this.publicationForm.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        if (this.publicationForm.get('image').valid) {
          this.imagePreview = reader.result as string;
        } else {
          this.imagePreview = null;
        }
      };
      reader.readAsDataURL(file);
    }
  
  
  }
  