import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
 import { onCreateTodo } from '../../../graphql/subscriptions';
 import { Observable as rxObservable, of } from "rxjs";
import * as Observable from "zen-observable";
import { Todo } from 'src/types/Todo';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  todos: Array<Todo>;

  headElements = ['Name', 'Status', 'Comment'];

  constructor(private _api: APIService) { }

  async ngOnInit() {
    this._api.ListTodos().then(data => {
      this.todos = data.items;
    })

    var subscription = API.graphql(
      graphqlOperation(onCreateTodo, {owner: (await Auth.currentUserInfo()).username})
    ) as Observable<object>;
    
    subscription.subscribe({
      next: (sourceData) => {
        const newTodo = (sourceData as any).value.data.onCreateTodo;
        this.todos = [newTodo, ...this.todos];
      }
    });
  
  }
  

}
