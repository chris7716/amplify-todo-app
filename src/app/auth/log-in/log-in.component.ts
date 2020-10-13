import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  googleSignIn(){
    Auth.federatedSignIn({customProvider: 'Google'})
  }

  facebookSignIn(){
    Auth.federatedSignIn({customProvider: 'Facebook'})
  }

}
