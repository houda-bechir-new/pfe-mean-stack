import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Equipe } from '../models/Equipe.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EquipeService {

  constructor(private http: HttpClient) {}

  private equipe: Equipe[] = [ ];
  public equipe$ = new Subject<Equipe[]>();

  getEquipe() {
    this.http.get('http://localhost:3000/api/equipe').subscribe(
      (equipe: Equipe[]) => {
        if (equipe) {
          this.equipe = equipe;
          this.emitEquipe();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitEquipe() {
    this.equipe$.next(this.equipe);
  }

  getEquipeById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/equipe/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
       );
    });
  }

  createNewEquipe(equipe: Equipe) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/equipe', equipe).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewEquipeWithFile(equipe: Equipe, image: File) {
    return new Promise((resolve, reject) => {
      const equipeData = new FormData();
      equipeData.append('equipe', JSON.stringify(equipe));
      equipeData.append('image', image, equipe.prenom);
      this.http.post('http://localhost:3000/api/equipe', equipeData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyEquipe(id: string, equipe: Equipe) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/equipe/' + id, equipe).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  modifyEquipeWithFile(id: string, equipe: Equipe, image: File | string) {
    return new Promise((resolve, reject) => {
      let equipeData: Equipe | FormData;
      if (typeof image === 'string') {
        equipe.image = image;
        equipeData = equipe;
      } else {
        equipeData = new FormData();
        equipeData.append('equipe', JSON.stringify(equipe));
        equipeData.append('image', image, equipe.prenom);
      }
      this.http.put('http://localhost:3000/api/equipe/' + id, equipeData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteEquipe(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/equipe/' + id).subscribe(
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
