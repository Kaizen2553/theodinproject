export class Ui {
  static initialize() {
    this.projectListContainer = document.querySelector(".project-list");
    this.projectTitle = document.querySelector(".project-title");
    this.todoListContainer = document.querySelector(".todo-list");
    this.modalContainer = document.querySelector(".modal");
    this.modalOverlayContainer = document.querySelector(".modal-overlay");
  }

  static renderProjects(list) {
    const buttonsHtml = list.projects
      .map((project) => {
        return `<button class="project-btn" data-project-title="${project.name}">${project.name}</button>`;
      })
      .join("");
    this.projectListContainer.innerHTML = buttonsHtml;
  }

  static renderProjectTitle(title) {
    this.projectTitle.innerHTML = title;
  }

  static renderTasks(todos) {
    const taskList = todos
      .map((todo) => {
        return `<div class="sticky-note" data-todo-id="${todo.id}">
              <h3>${todo.title}</h3>
              <p>${todo.dueDate}</p>
            </div>`;
      })
      .join("");
    this.todoListContainer.innerHTML = taskList;
  }

  static renderDetails(todo) {
    this.modalContainer.innerHTML = `
        <h2>${todo.title}</h2>

        <p><strong>Due Date:</strong> ${todo.dueDate}</p>

        <p><strong>Priority:</strong> ${todo.priority}</p>

        <h3>Description</h3>
        <p>${todo.description || "No description"}</p>

        <h3>Notes</h3>
        <p>${todo.note || "No notes"}</p>

        <p>
            <strong>Status:</strong>
            ${todo.checkList ? "Completed" : "Pending"}
        </p>

        <div class="modal-btn">
            <button class="modal-del-btn edit-btn" data-todo-id=${todo.id}>edit</button>
            <button class="modal-del-btn done-btn" data-todo-id=${todo.id}>done</button>
            <button class="modal-del-btn del-btn" data-todo-id=${todo.id}>delete</button> 
        </div>
    `;
  }

  static renderEditForm(todo) {
    this.modalContainer.innerHTML = `
        <h2>Edit Todo</h2>

        <div class="todo-form">

            <label for="todo-title">Title</label>
            <input
                type="text"
                id="todo-title"
                value="${todo.title}"
            >

            <label for="todo-description">
                Description
            </label>
            <textarea
                id="todo-description"
                rows="4"
            >${todo.description}</textarea>

            <label for="todo-due-date">
                Due Date
            </label>
            <input
                type="date"
                id="todo-due-date"
                value="${todo.dueDate}"
            >

            <label for="todo-priority">
                Priority
            </label>
            <select id="todo-priority">
                <option value="1" ${todo.priority == 1 ? "selected" : ""}>
                    Low
                </option>

                <option value="2" ${todo.priority == 2 ? "selected" : ""}>
                    Medium
                </option>

                <option value="3" ${todo.priority == 3 ? "selected" : ""}>
                    High
                </option>
            </select>

            <label for="todo-note">
                Notes
            </label>
            <textarea
                id="todo-note"
                rows="3"
            >${todo.note}</textarea>

            <div class="modal-btn">
                <button
                    class="save-edit-btn "
                    data-todo-id="${todo.id}"
                >
                    Save
                </button>

                <button class="cancel-btn">
                    Cancel
                </button>
            </div>

        </div>
    `
  }

  static renderNewTodoForm() {
    this.modalContainer.innerHTML = `
        <h2>New Todo</h2>

        <div class="todo-form">

            <label for="todo-title">Title</label>
            <input
                type="text"
                id="todo-title"
                placeholder="Enter title"
            >

            <label for="todo-description">
                Description
            </label>
            <textarea
                id="todo-description"
                rows="4"
                placeholder="Enter description"
            ></textarea>

            <label for="todo-due-date">
                Due Date
            </label>
            <input
                type="date"
                id="todo-due-date"
            >

            <label for="todo-priority">
                Priority
            </label>
            <select id="todo-priority">
                <option value="1">
                    Low
                </option>
                <option value="2" selected>
                    Medium
                </option>
                <option value="3">
                    High
                </option>
            </select>

            <label for="todo-note">
                Notes
            </label>
            <textarea
                id="todo-note"
                rows="3"
                placeholder="Enter notes"
            ></textarea>

            <div class="modal-btn">
                <button class="save-new-btn">
                    Create
                </button>

                <button class="cancel-btn">
                    Cancel
                </button>
            </div>

        </div>
    `
  }

  static bindProjectSelection(handler) {
    this.projectListContainer.addEventListener("click", handler);
  }

  static bindTodoSelection(handler) {
    this.todoListContainer.addEventListener("click", handler);
  }

  static bindModalHandler(handler) {
    this.modalOverlayContainer.addEventListener("click", handler);
  }

  static hideModal() {
    this.modalOverlayContainer.classList.add("hidden");
  }

  static showModal() {
    this.modalOverlayContainer.classList.remove("hidden");
  }
}
