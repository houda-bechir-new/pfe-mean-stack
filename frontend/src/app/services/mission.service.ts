import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../models/Mission.model';


@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient) { }

 private  missions: Mission[] = [];

 public missions$ = new Subject<Mission[]>();

 getMissions() {
   this.http.get('http://localhost:3000/api/mission').subscribe(
     (missions: Mission[]) => {
       if (missions) {
         this.missions = missions;
         this.emitMissions();
       }
     },
     (error) => {
      console.log(error);
    }
  );
}

emitMissions() {
  this.missions$.next(this.missions);
}

getMissionById(id: string) {
  return new Promise((resolve, reject) => {
    this.http.get('http://localhost:3000/api/mission/' + id).subscribe(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

createNewMission(mission: Mission){
  return new Promise((resolve, reject) => {
    this.http.post('http://localhost:3000/api/mission', mission).subscribe(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

modifyMission(id: string, mission: Mission) {
  return new Promise((resolve, reject) => {
    this.http.put('http://localhost:3000/api/mission/' + id, mission).subscribe(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

deleteMission(id: string) {
  return new Promise((resolve, reject) => {
    this.http.delete('http://localhost:3000/api/mission/' + id).subscribe(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );
  });
}





}
