import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: string;
  imageUrl: string;

  constructor() { }

  ngOnInit(): void {
    Auth.currentAuthenticatedUser()
    .then(userData =>{
      this.name = userData.attributes.given_name;
      this.imageUrl = userData.attributes.picture;
      console.log(this.name);
    })
    .catch(() => console.log('Not signed in'));
  }

  logOut(){
    Auth.signOut();
  }

}
