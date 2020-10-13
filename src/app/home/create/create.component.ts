import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/types/Todo';
import { APIService } from '../../API.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public createForm: FormGroup;

  todos: Array<Todo>;

  constructor(private fb: FormBuilder, private _api: APIService) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'status': ['', Validators.required],
      'comment': ['', Validators.required]
    });

    this._api.ListTodos().then(data => {
      this.todos = data.items;
    })

  }

  public onCreate(todo: Todo) {
    this._api.CreateTodo(todo).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }

}
