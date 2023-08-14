import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Equipe } from '../../../models/Equipe.model';
import { mimeType } from '../../../mime-type.validator';
import { StateService } from '../../../services/state.service';
import { EquipeService } from '../../../services/equipe.service';

@Component({
  selector: 'app-new-equipe',
  templateUrl: './new-equipe.component.html',
  styleUrls: ['./new-equipe.component.scss']
})
export class NewEquipeComponent implements OnInit {
  public equipeForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;


  constructor(private state: StateService,
    private formBuilder: FormBuilder,
    private equipeService: EquipeService,
    private router: Router,
    private auth: AuthService) { }

    ngOnInit() {
      this.state.mode$.next('form');
      this.equipeForm = this.formBuilder.group({
        nom: [null, Validators.required],
        prenom: [null, Validators.required],
        image: [null, Validators.required, mimeType],
        occupation: [null, Validators.required],
        etablissement:[null, Validators.required]
    });
    this.userId = this.auth.userId; 
  
  }
  onSubmit() {
    this.loading = true;
    const equipe = new Equipe();
    equipe.nom = this.equipeForm.get('nom').value;
    equipe.prenom = this.equipeForm.get('prenom').value;
    equipe.occupation = this.equipeForm.get('occupation').value; 
    equipe.etablissement = this.equipeForm.get('etablissement').value;
    equipe.image = ''; 
    this.equipeService.createNewEquipeWithFile(equipe, this.equipeForm.get('image').value).then(
      () => {
        this.equipeForm.reset();
        this.loading = false;
        this.router.navigate(['/part-four/admin/equipe-list']);
      },
      (error) => {
        console.log("create with file met3addateech !!")
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
  
  
  
  
    onImagePick(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
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
  
  
  }
