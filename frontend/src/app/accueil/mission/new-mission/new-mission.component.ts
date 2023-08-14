import { Component, OnInit, OnDestroy  } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Mission } from '../../../models/Mission.model';
import { MissionService } from '../../../services/mission.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';





@Component({
  selector: 'app-new-mission',
  templateUrl: './new-mission.component.html',
  styleUrls: ['./new-mission.component.scss']
})
export class NewMissionComponent implements OnInit, OnDestroy  {

  public editorForm: FormGroup;
  public missionForm: FormGroup;
  public loading = false;
  public part: number;
  public errorMessage: string;
  private partSub: Subscription;


  constructor(private state: StateService,
    private formBuilder: FormBuilder,
    private missionService: MissionService,
    private router: Router,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.missionForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
     
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
    const mission = new Mission();
    mission.title = this.missionForm.get('title').value;
    mission.description = this.missionForm.get('description').value;
    mission._id = new Date().getTime().toString();
    this.missionService.createNewMission(mission).then(
      () => {
        console.log("new mission cv");
        this.missionForm.reset();
        this.loading = false;
        switch (this.part) {
          case 4:
            this.router.navigate(['/part-four/admin/mission-list']);
            break;
           
        }})
      
    .catch(
      (error) => {
        console.log("new mission mich cv -___-");
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }

}
