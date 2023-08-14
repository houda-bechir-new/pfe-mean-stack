import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { EquipeService } from '../../../services/equipe.service';
import { Equipe } from '../../../models/Equipe.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { mimeType } from '../../../mime-type.validator';



@Component({
  selector: 'app-modify-equipe',
  templateUrl: './modify-equipe.component.html',
  styleUrls: ['./modify-equipe.component.scss']
})
export class ModifyEquipeComponent implements OnInit, OnDestroy {

  public equipeForm: FormGroup;
  public equipe: Equipe;
  public loading: boolean;
  public errorMessage: string;
  public part: number;
  private partSub: Subscription;
  public imagePreview: string;

 
  
  constructor( private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService,
    private equipeService: EquipeService,
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
          this.equipeService.getEquipeById(params.id).then(
            (equipe: Equipe) => {
              this.equipe = equipe;
              
              this.equipeForm = this.formBuilder.group({
                prenom: [equipe.prenom, Validators.required],
                nom: [equipe.nom, Validators.required],
                etablissement: [equipe.etablissement, Validators.required],
                occupation: [equipe.occupation, Validators.required],
                image: [equipe.image, Validators.required, mimeType],
              });
              this.imagePreview = equipe.image;
            this.loading = false;
             
            }
          );
        }
      );
    }
  
    onSubmit() {
      this.loading = true;
      const equipe = new Equipe();
      equipe._id = this.equipe._id;
      equipe.prenom = this.equipeForm.get('prenom').value;
      equipe.etablissement = this.equipeForm.get('etablissement').value;
      equipe.nom = this.equipeForm.get('nom').value;
      equipe.occupation = this.equipeForm.get('occupation').value; 
      equipe.image = ''; 
      console.log(this.equipeForm.get('image').value);
      this.equipeService.modifyEquipeWithFile(this.equipe._id, equipe, this.equipeForm.get('image').value).then(
        () => {
          console.log('modify equipe  t3addat');
          console.log(this.equipe.image);
          this.equipeForm.reset();
          this.loading = false;
          this.router.navigate(['/part-four/admin/equipe-list']);
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
      this.equipeForm.get('image').patchValue(file);
      this.equipeForm.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        if (this.equipeForm.get('image').valid) {
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
