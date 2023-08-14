import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { MissionService } from '../../../services/mission.service';
import { Mission } from '../../../models/Mission.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-modify-mission',
  templateUrl: './modify-mission.component.html',
  styleUrls: ['./modify-mission.component.scss']
})
export class ModifyMissionComponent implements OnInit, OnDestroy {

  public missionForm: FormGroup;
  public mission: Mission;
  public loading: boolean;
  public errorMessage: string;
  public part: number;
  private partSub: Subscription;
 
  
  constructor( private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService,
    private missionService: MissionService,
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
          this.missionService.getMissionById(params.id).then(
            (mission: Mission) => {
              this.mission = mission;
              this.missionForm = this.formBuilder.group({
                title: [mission.title, Validators.required],
                description: [mission.description, Validators.required],
               
              });
              this.loading = false;
             
            }
          );
        }
      );
    }
  
    onSubmit() {
      this.loading = true;
      const mission = new Mission();
      mission._id = this.mission._id;
      mission.title = this.missionForm.get('title').value;
      mission.description = this.missionForm.get('description').value;
      this.missionService.modifyMission(this.mission._id, mission).then(
        () => {
          console.log('modify mission  t3addat');
          this.missionForm.reset();
          this.loading = false;
              this.router.navigate(['/part-four/admin/mission-list']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error.message;
        }
      );
    }
    ngOnDestroy() {
      this.partSub.unsubscribe();
    }
}
