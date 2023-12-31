import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { ApiAiClient} from 'api-ai-javascript/es6/ApiAiClient';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


export class Message {
  constructor(public content: string, public sentBy: string){}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  readonly token = environment.dialogflow.PMO;
  readonly client = new ApiAiClient({accessToken: this.token});

  conversation = new BehaviorSubject<Message[]>([]);
  constructor() { }

  talk(){
    this.client.textRequest('hey')
    .then(res => console.log(res) );
  }

//adds msg to source
update(msg: Message) {
  this.conversation.next([msg]);
}

//sends and receives msgs via DialogFlow
converse(msg: string){
  const userMessage = new Message(msg, 'user');
  this.update(userMessage);
  return this.client.textRequest(msg)
  .then(res => {
     const speech = res.result.fulfillment.speech;
     const botMessage = new Message(speech, 'bot');
     this.update(botMessage);
  });
}

}





