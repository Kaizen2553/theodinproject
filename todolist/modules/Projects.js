export class Projects{
    constructor(name){
        this.name = name;
        this.todos = [];
    }
    
    addAtask(todo){
        this.todos.push(todo);
    }

    getTodo(id){
        id = Number(id);
        return this.todos.find(todo => todo.id === id);
    }

    deleteAtask(id){
        id = Number(id);
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    refreshProject(){
        this.todos = this.todos.filter(todo => todo.checkList===false);
    }

    sortTodoBasedOnPriority(){
        this.todos.sort( (a,b) => b.priority - a.priority );
    }

}
