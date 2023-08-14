import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/Contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  private  contacts: Contact[] = [];

  public contacts$ = new Subject<Contact[]>();


  getContacts() {
    this.http.get('http://localhost:3000/api/contact').subscribe(
      (contacts: Contact[]) => {
        if (contacts) {
          this.contacts = contacts;
          this.emitContacts();
        }
      },
      (error) => {
       console.log(error);
     }
   );
 }
 
 emitContacts() {
   this.contacts$.next(this.contacts);
 }
 
 getContactById(id: string) {
   return new Promise((resolve, reject) => {
     this.http.get('http://localhost:3000/api/contact/' + id).subscribe(
       (response) => {
         resolve(response);
       },
       (error) => {
         reject(error);
       }
     );
   });
 }
 
 createNewContact(contact: Contact){
   return new Promise((resolve, reject) => {
     this.http.post('http://localhost:3000/api/contact', contact).subscribe(
       (response) => {
         resolve(response);
       },
       (error) => {
         reject(error);
       }
     );
   });
 }
 
 modifyContact(id: string, contact: Contact) {
   return new Promise((resolve, reject) => {
     this.http.put('http://localhost:3000/api/contact/' + id, contact).subscribe(
       (response) => {
         resolve(response);
       },
       (error) => {
         reject(error);
       }
     );
   });
 }
 
 deleteContact(id: string) {
   return new Promise((resolve, reject) => {
     this.http.delete('http://localhost:3000/api/contact/' + id).subscribe(
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
