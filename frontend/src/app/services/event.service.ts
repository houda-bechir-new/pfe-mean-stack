import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Evenement } from '../models/Event.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private http: HttpClient) {}

  private event: Evenement[] = [ ];
  public event$ = new Subject<Evenement[]>();

  getEvent() {
    this.http.get('http://localhost:3000/api/event').subscribe(
      (event: Evenement[]) => {
        if (event) {
          this.event = event;
          this.emitEvent();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitEvent() {
    this.event$.next(this.event);
  }

  getEventById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/event/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewEvent(event: Evenement) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/event', event).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewEventWithFile(event: Evenement, image: File) {
    return new Promise((resolve, reject) => {
      const eventData = new FormData();
      eventData.append('event', JSON.stringify(event));
      eventData.append('image', image, event.title);
      this.http.post('http://localhost:3000/api/event', eventData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  modifyEventWithFile(id: string, event: Evenement, image: File | string) {
    return new Promise((resolve, reject) => {
      let eventData: Evenement | FormData;
      if (typeof image === 'string') {
        event.image = image;
        eventData = event;
      } else {
        eventData = new FormData();
        eventData.append('event', JSON.stringify(event));
        eventData.append('image', image, event.title);
      }
      this.http.put('http://localhost:3000/api/event/' + id, eventData).subscribe(
        (response) => {
          resolve(response);
          console.log(event.image)
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteEvent(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/event/' + id).subscribe(
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
