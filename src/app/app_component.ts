import {NgFor, Component, View} from 'angular2/angular2';
import {Store, Todo, TodoFactory} from './data_service';
import {RedDec} from './red_directive';

@Component({selector: 'my-app', viewProviders: [Store, TodoFactory]})
@View({templateUrl: 'app_component.html', directives: [NgFor, RedDec]})
class AppComponent {
  todoEdit: Todo = null;

  constructor(public todoStore: Store, public factory: TodoFactory) {}

  enterTodo(inputElement): void {
    this.addTodo(inputElement.value);
    inputElement.value = '';
  }

  editTodo(todo: Todo): void { this.todoEdit = todo; }

  doneEditing($event, todo: Todo): void {
    var which = $event.which;
    var target = $event.target;
    if (which === 13) {
      todo.title = target.value;
      this.todoEdit = null;
    } else if (which === 27) {
      this.todoEdit = null;
      target.value = todo.title;
    }
  }

  addTodo(newTitle: string): void { this.todoStore.add(this.factory.create(newTitle, false)); }

  completeMe(todo: Todo): void { todo.completed = !todo.completed; }

  deleteMe(todo: Todo): void { this.todoStore.remove(todo); }

  toggleAll($event): void {
    var isComplete = $event.target.checked;
    this.todoStore.list.forEach((todo: Todo) => { todo.completed = isComplete; });
  }

  clearCompleted(): void { this.todoStore.removeBy((todo: Todo) => todo.completed); }
}