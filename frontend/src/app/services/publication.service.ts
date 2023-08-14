import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Publication } from '../models/Publication.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PublicationService {

  constructor(private http: HttpClient) {}

  private publication: Publication[] = [ ];
  public publication$ = new Subject<Publication[]>();

  getPublication() {
    this.http.get('http://localhost:3000/api/publication').subscribe(
      (publication: Publication[]) => {
        if (publication) {
          this.publication = publication;
          this.emitPublication();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitPublication() {
    this.publication$.next(this.publication);
  }

  getPublicationById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/publication/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewPublication(publication: Publication) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/publication', publication).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewPublicationWithFile(publication: Publication, image: File) {
    return new Promise((resolve, reject) => {
      const publicationData = new FormData();
      publicationData.append('publication', JSON.stringify(publication));
      publicationData.append('image', image, publication.title);
      this.http.post('http://localhost:3000/api/publication', publicationData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPublication(id: string, publication: Publication) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/publication/' + id, publication).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  modifyPublicationWithFile(id: string, publication: Publication, image: File | string) {
    return new Promise((resolve, reject) => {
      let publicationData: Publication | FormData;
      if (typeof image === 'string') {
        publication.image = image;
        publicationData = publication;
      } else {
        publicationData = new FormData();
        publicationData.append('publication', JSON.stringify(publication));
        publicationData.append('image', image, publication.title);
      }
      this.http.put('http://localhost:3000/api/publication/' + id, publicationData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deletePublication(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/publication/' + id).subscribe(
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
