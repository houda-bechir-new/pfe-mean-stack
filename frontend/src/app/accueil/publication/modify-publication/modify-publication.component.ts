import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { PublicationService } from '../../../services/publication.service';
import { Publication } from '../../../models/Publication.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { mimeType } from '../../../mime-type.validator';

@Component({
  selector: 'app-modify-publication',
  templateUrl: './modify-publication.component.html',
  styleUrls: ['./modify-publication.component.scss']
})
export class ModifyPublicationComponent implements OnInit, OnDestroy {
 
  public publicationForm: FormGroup;
  public publication: Publication;
  public loading: boolean;
  public errorMessage: string;
  public part: number;
  private partSub: Subscription;
  public imagePreview: string;

  constructor( private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService,
    private publicationService: PublicationService,
    private formBuilder: FormBuilder,) { }

    ngOnInit() {
      this.loading = true;
      this.state.mode$.next('modify-publication');

      this.partSub = this.state.part$.subscribe(
        (part) => {
          this.part = part;
        }
      );
     
      this.route.params.subscribe(
        (params: Params) => {
          this.publicationService.getPublicationById(params.id).then(
            (publication: Publication) => {
              this.publication = publication;
              this.publicationForm = this.formBuilder.group({
                title: [publication.title, Validators.required],
                detail: [publication.detail, Validators.required],
                description: [publication.description, Validators.required],
                image: [publication.image, Validators.required, mimeType],
              });
              this.imagePreview = publication.image;
              this.loading = false;             
            }
          );
        }
      );
    }
    onSubmit() {
      this.loading = true;
      const publication = new Publication();
      publication._id = this.publication._id;
      publication.title = this.publicationForm.get('title').value;
  publication.description = this.publicationForm.get('description').value;
  publication.detail = this.publicationForm.get('detail').value;
  publication.image = ''; 
      this.publicationService.modifyPublicationWithFile(this.publication._id, publication, this.publicationForm.get('image').value).then(
        () => {
          console.log('modify publication  t3addat');
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
  

    ngOnDestroy() {
      this.partSub.unsubscribe();
    }

}
