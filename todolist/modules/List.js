import { Projects } from "./Projects.js";
import { Todos } from "./Todos.js";

export class List{
    constructor(){
        this.projects = [];
        this.projects.push(new Projects("default"));
    }

    addTodo(todo,project_name){
         let idx = -1;
         let project = this.getProject(project_name);
         if(project){
            project.addAtask(todo);
            return true;
         }else{
            this.projects[0].addAtask(todo);
            return false;
         }
    }

    createProject(project){
        if(this.getProject(project.name)){
            throw new Error("project with same name already exist");
        }
        this.projects.push(project);
    }

    deleteProject(project_name){
        this.projects = this.projects.filter(project => project.name !== project_name)
    }

    getProject(projectName){
        return this.projects.find(project => project.name === projectName);
    }

    saveToLocalStorage() {
        localStorage.setItem('odin_todo_list', JSON.stringify(this.projects));
    }

    loadFromLocalStorage() {
        const raw = localStorage.getItem('odin_todo_list');
        if (!raw) return false;
        try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return false;
            
            this.projects = [];
            let maxId = 0;
            
            parsed.forEach(projData => {
                const project = new Projects(projData.name);
                if (projData.todos && Array.isArray(projData.todos)) {
                    projData.todos.forEach(todoData => {
                        const todo = new Todos(
                            todoData.id,
                            todoData.title,
                            todoData.description,
                            todoData.dueDate,
                            todoData.priority
                        );
                        todo.checkList = todoData.checkList || false;
                        todo.note = todoData.note || "";
                        if (todo.id >= maxId) {
                            maxId = todo.id + 1;
                        }
                        project.addAtask(todo);
                    });
                }
                this.projects.push(project);
            });
            Todos.idCount = maxId;
            return true;
        } catch (e) {
            console.error("Error loading local storage data:", e);
            return false;
        }
    }
}
