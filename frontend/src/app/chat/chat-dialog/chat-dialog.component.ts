import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ChatService, Message } from '../chat.service';
import {scan} from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Renderer2, Inject } from '@angular/core';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

 messages: Observable<Message[]>;
 formValue: string;

  constructor( private chat: ChatService, private renderer2: Renderer2,  @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/js/chatbot.js';
    s.text = ``;
    this.renderer2.appendChild(document.body, s);
    console.log( this.renderer2.appendChild(document.body, s));
    this.chat.talk();
    this.messages=this.chat.conversation.asObservable().pipe(scan((acc,val)=>acc.concat(val)));
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue='';
  }

}
