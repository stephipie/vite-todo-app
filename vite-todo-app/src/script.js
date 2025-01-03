const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let listItem = [];

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskName = todoInput.value.trim();
  if (taskName === "") {
    alert("Bitte füge eine neue Aufgabe hinzu");
    return false;
  }

  const newTask = {
    id: Date.now(),
    textInput: taskName,
    status: false,
  };
  listItem.push(newTask);
  todoInput.value = "";
  showTodos();
});

function showTodos() {
  todoList.innerHTML = "";

  // Add new task to task-list
  listItem.forEach((task) => {
    const taskListItem = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.status;
    // checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute("aria-label", "Aufgabe erledigen");
    checkBox.addEventListener("change", () => {
      task.status = checkBox.checked;
      showTodos();
      saveTodos();
    });

    const span = document.createElement("span");
    // span.innerText = task.id + ' ' + task.textInput;
    span.innerText = task.textInput;
    if (task.status) {
      span.style.textDecoration = "line-through";
    }

    const button = document.createElement("button");
    button.innerText = "Löschen";
    button.setAttribute("aria-label", "Aufgabe löschen");
    // Function of delete-button
    button.addEventListener("click", () => {
      const actualListItem = button.parentElement;
      todoList.removeChild(actualListItem);
      listItem.pop(task.id);
      saveTodos();
    });

    taskListItem.appendChild(checkBox);
    taskListItem.appendChild(span);
    taskListItem.appendChild(button);
    todoList.appendChild(taskListItem);
  });
  saveTodos();
}

// Create function to save todo´s
function saveTodos() {
  if (listItem.length === 0) {
    return;
  }
  const localStorageTodos = JSON.stringify(listItem);
  localStorage.setItem("todos", localStorageTodos);
}
function loadTodos() {
  const existingTodos = localStorage.getItem("todos");
  if (!existingTodos) {
    listItem = [];
  } else {
    const parse = JSON.parse(existingTodos);
    listItem = parse;
  }
}
loadTodos();
showTodos();
