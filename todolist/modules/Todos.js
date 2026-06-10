export class Todos{
    static idCount = 0;
    constructor(id,title,description,dueDate,priority){
        this.id = (id !== null && id !== undefined) ? Number(id) : Todos.idCount;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checkList = false;
        this.note = "";
        if (this.id >= Todos.idCount) {
            Todos.idCount = this.id + 1;
        } else {
            Todos.idCount++;
        }
    }

    checkTheTask(){
        this.checkList = true;
    }

    setNote(note){
        this.note = note;
    }

    changePriority(priority){
        this.priority = priority;
    }

    changeDueDate(dueDate){
        this.dueDate = dueDate;
    }

    editTask(dueDate,description,title,priority){
        if(dueDate){
            this.dueDate = dueDate;
        }

        if(description){
            this.description = description;
        }

        if(title){
            this.title = title;
        }

        if(priority){
            this.priority = priority;
        }
    }

}