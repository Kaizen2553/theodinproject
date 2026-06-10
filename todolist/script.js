import {Todos} from './modules/Todos.js'
import {Ui} from './modules/Ui.js'
import { Projects } from './modules/Projects.js';
import {List} from './modules/List.js'

const list = new List();

// Try loading from local storage, if empty, set up the original defaults.
const loaded = list.loadFromLocalStorage();
if (!loaded) {
    const workProject = new Projects("Work");
    const personalProject = new Projects("Personal");
    const collegeProject = new Projects("College");
    workProject.addAtask(
        new Todos(
            1,
            "Study Graphs",
            "Solve 5 graph problems from LeetCode",
            "2026-06-20",
            3
        )
    );

    workProject.addAtask(
        new Todos(
            2,
            "Odin Project",
            "Finish Local Storage section",
            "2026-06-22",
            2
        )
    );
    personalProject.addAtask(
        new Todos(
            3,
            "Gym",
            "Leg day workout",
            "2026-06-15",
            1
        )
    );

    personalProject.addAtask(
        new Todos(
            4,
            "Buy Shoes",
            "Visit market and compare prices",
            "2026-06-18",
            2
        )
    );
    collegeProject.addAtask(
        new Todos(
            5,
            "DBMS Assignment",
            "Complete normalization questions",
            "2026-06-16",
            3
        )
    );

    collegeProject.addAtask(
        new Todos(
            6,
            "Prepare Presentation",
            "Create slides for seminar",
            "2026-06-25",
            2
        )
    );
    list.createProject(workProject);
    list.createProject(personalProject);
    list.createProject(collegeProject);
    list.saveToLocalStorage();
}

let currentChosenProject = list.projects[0] || list.getProject('default');
Ui.initialize();
Ui.renderProjects(list);
Ui.renderProjectTitle(currentChosenProject.name);
Ui.renderTasks(currentChosenProject.todos);

//function to implement project selection

const projectSelection = (e)=>{
    if(!e.target.closest('.project-btn'))return;
    const button = e.target.closest('.project-btn');
    const projectName = button.dataset.projectTitle;
    
    currentChosenProject = list.getProject(projectName);
    Ui.renderProjectTitle(currentChosenProject.name);
    Ui.renderTasks(currentChosenProject.todos);
}

const todoSelection = (e)=>{
    if(!e.target.closest('.sticky-note'))return;
    const note = e.target.closest('.sticky-note');
    
    const id = note.dataset.todoId;
    
    const todo = currentChosenProject.getTodo(id);

    if(todo){
        Ui.renderDetails(todo);
        Ui.showModal();
    }
    return;
}

const handleModal = (e) => { 

    const delBtn = e.target.closest('.del-btn');
    const editBtn = e.target.closest('.edit-btn');
    const doneBtn = e.target.closest('.done-btn');
    
    // Minimal addition: Cancel button click handler
    const cancelBtn = e.target.closest('.cancel-btn');
    // Minimal addition: Save Edit button click handler
    const saveEditBtn = e.target.closest('.save-edit-btn');
    // Minimal addition: Create New button click handler
    const saveNewBtn = e.target.closest('.save-new-btn');

    if (cancelBtn) {
        Ui.hideModal();
        return;
    }

    if(delBtn){
        const id = delBtn.dataset.todoId;
        currentChosenProject.deleteAtask(id);
        list.saveToLocalStorage(); // save storage
        Ui.renderTasks(currentChosenProject.todos);
        Ui.hideModal();
        return;
    }

    if(doneBtn){
        const id = doneBtn.dataset.todoId;
        const todo = currentChosenProject.getTodo(id);
        todo.checkTheTask();
        currentChosenProject.refreshProject();
        list.saveToLocalStorage(); // save storage
        Ui.renderTasks(currentChosenProject.todos);
        Ui.hideModal();
        return;
    }

    if(editBtn){
        const id = editBtn.dataset.todoId;
        const todo = currentChosenProject.getTodo(id);
        Ui.renderEditForm(todo);
        return;
    }

    if (saveEditBtn) {
        const id = saveEditBtn.dataset.todoId;
        const todo = currentChosenProject.getTodo(id);
        
        const title = document.getElementById('todo-title').value.trim();
        const description = document.getElementById('todo-description').value.trim();
        const dueDate = document.getElementById('todo-due-date').value;
        const priority = Number(document.getElementById('todo-priority').value);
        const note = document.getElementById('todo-note').value.trim();

        if (title) {
            todo.editTask(dueDate, description, title, priority);
            todo.setNote(note);
            list.saveToLocalStorage(); // save storage
            Ui.renderTasks(currentChosenProject.todos);
            Ui.hideModal();
        } else {
            alert("Title cannot be empty!");
        }
        return;
    }

    if (saveNewBtn) {
        const title = document.getElementById('todo-title').value.trim();
        const description = document.getElementById('todo-description').value.trim();
        const dueDate = document.getElementById('todo-due-date').value;
        const priority = Number(document.getElementById('todo-priority').value);
        const note = document.getElementById('todo-note').value.trim();

        if (title) {
            const newTodo = new Todos(null, title, description, dueDate, priority);
            newTodo.setNote(note);
            currentChosenProject.addAtask(newTodo);
            list.saveToLocalStorage(); // save storage
            Ui.renderTasks(currentChosenProject.todos);
            Ui.hideModal();
        } else {
            alert("Title cannot be empty!");
        }
        return;
    }
   
    const close = e.target.closest('.modal');
    if(close)return;
    Ui.hideModal();
}

Ui.bindProjectSelection(projectSelection)
Ui.bindTodoSelection(todoSelection);
Ui.bindModalHandler(handleModal);

// Minimal addition: Project creation input/button handlers
const addProjectBtn = document.getElementById('add-project-btn');
if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
        const input = document.getElementById('new-project-input');
        const name = input.value.trim();
        if (name) {
            if (list.getProject(name)) {
                alert("Project with same name already exists!");
                return;
            }
            const newProj = new Projects(name);
            list.createProject(newProj);
            list.saveToLocalStorage();
            input.value = '';
            Ui.renderProjects(list);
            
            // Auto-select the newly created project
            currentChosenProject = newProj;
            Ui.renderProjectTitle(currentChosenProject.name);
            Ui.renderTasks(currentChosenProject.todos);
        }
    });
}

// Minimal addition: Project deletion button handler
const deleteProjectBtn = document.getElementById('delete-project-btn');
if (deleteProjectBtn) {
    deleteProjectBtn.addEventListener('click', () => {
        if (currentChosenProject.name === 'default') {
            alert("Cannot delete the default project!");
            return;
        }
        if (confirm(`Are you sure you want to delete project "${currentChosenProject.name}"?`)) {
            list.deleteProject(currentChosenProject.name);
            list.saveToLocalStorage();
            
            currentChosenProject = list.projects[0] || list.getProject('default');
            Ui.renderProjects(list);
            Ui.renderProjectTitle(currentChosenProject.name);
            Ui.renderTasks(currentChosenProject.todos);
        }
    });
}

// Minimal addition: Add Todo button click handler
const addTodoBtn = document.getElementById('add-todo-btn');
if (addTodoBtn) {
    addTodoBtn.addEventListener('click', () => {
        Ui.renderNewTodoForm();
        Ui.showModal();
    });
}
